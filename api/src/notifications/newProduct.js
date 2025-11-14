import { prisma } from "../../prisma/client";

export const newProductNotification = async (req, res) => {
  const buyerId = req.user.id;
  try {
    const newnotification = await prisma.buyerNotification({
      userId: buyerId,
    });
  } catch (error) {}
};
