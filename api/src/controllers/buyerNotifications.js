import { prisma } from "../../prisma/client.js";

export const getBuyerNotification = async (req, res) => {
  console.log("req.user==>", req);
  try {
    const userId = req.user.id;
    console.log("Waitings for Notification");

    const newNotification = await prisma.buyerNotification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    const Notelength = newNotification.length;
    console.log("Notification==>", newNotification);
    return res
      .status(200)
      .json({ notification: newNotification, notificationLen: Notelength, message: "new notification" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
export const getAllBuyerNotifications = async (req, res) => {
  try {
    console.log("Waitings for Notification");
    const newNotification = await prisma.buyerNotification.findMany();
    console.log("Notification==>", newNotification);
    return res.status(200).json({ notification: newNotification, message: "new notification" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
