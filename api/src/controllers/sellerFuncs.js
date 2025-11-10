import { prisma } from "../../prisma/client.js";

export const sellerProducts = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const products = await prisma.product.findMany({
      where: { ownerId },
    });
    console.log("owner products==>", products);
    res.status(200).json({ data: products, message: `Products for user with id ${ownerId}` });
  } catch (error) {
    console.log("Error in sellerProducts Fn==>", error);
    res.status(500).json({ Error: error });
  }
};

export const getOrderedProducts = async (req, res) => {
  const ownerId = req.user.id; //from jwt token sent
  try {
    const orderedItems = await prisma.cartItem.findMany({
      where: { ownerId, isOrdered: true },
      include: {
        cartItems: true,
      },
    });
    console.log("orderedItems==>", orderedItems);
    res.status(200).json({ data: orderedItems, message: "✅ orderd items got" });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getRemainingProducts = async (req, res) => {
  const ownerId = req.user.id;
  try {
    const products = await prisma.product.findMany({
      where: { ownerId },
    });
    // const remaining = products.
    console.log("Remaining products==>", products);
    res.status(200).json({ data: products, message: `Products for user with id ${ownerId}` });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ error: error.message });
  }
};
