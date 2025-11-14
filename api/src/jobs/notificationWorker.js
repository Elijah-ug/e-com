import { Worker } from "bullmq";
import { prisma } from "../../prisma/client.js";
import { getDistance } from "../../middleware/distance.js";
import { connection } from "./notificationQueue.js";

export const worker = new Worker(
  "notifications",
  async (job) => {
    console.log("🔗 job:", job);

    try {
      const { productId, sellerLat, sellerLon } = job.data;
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!product) return console.log("No pdt");
      //   get all buyers
      const buyers = await prisma.buyer.findMany({
        where: { latitude: { not: null }, longitude: { not: null } },
      });

      for (const buyer of buyers) {
        if (buyer.latitude && buyer.longitude) {
          console.log("Buyers with dist==>", buyer);
          const distance = getDistance(sellerLat, sellerLon, buyer.latitude, buyer.longitude);
          if (distance <= 5000) {
            await prisma.buyerNotification.create({
              data: {
                userId: buyer.id,
                productId,
                message: `New product "${product.id}" near you!`,
                meta: {
                  productName: product.name,
                  distance: distance, // in meters
                  price: product.price,
                  image: product.image, // if you want
                },
              },
            });
            console.log(`Notification created for buyer ${buyer.id}`);
          }
        }
      }
    } catch (error) {
      console.log("Error in worker==>", error.message);
    }

    //   console.log("📢 Processing job:", job.name, job.data);
    console.log("Connected");
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`✅ ${job.id} completed`);
  console.log("Connected");
});
