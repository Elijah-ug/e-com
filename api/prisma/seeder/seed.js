import { readFileSync } from "fs";
import { prisma } from "../client.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
// import products from "../products/products.json";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const main = async () => {
  const filePath = join(__dirname, "../products/products.json");
  // Read and parse the products.json file
  const data = JSON.parse(readFileSync(filePath, "utf-8"));
  // clean the db first
  await prisma.product.deleteMany({});
  // insert all products
  await prisma.product.createMany({
    data: data.map((p) => ({
      name: p.name,
      image: p.image,
      description: p.description || null,
      price: parseInt(p.price),
      ownerId: parseInt(p.ownerId) || 1,
    })),
    skipDuplicates: true,
  });
  console.log("✅ Products seeded");
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
