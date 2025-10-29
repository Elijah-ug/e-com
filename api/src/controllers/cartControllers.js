import { prisma } from "../../prisma/client.js";
export const addCartProduct = async (req, res) => {
  try {
    const { quantity, productId, buyerId } = req.body;
    const item = await prisma.cartItem.create({
      data: {
        quantity: parseInt(quantity),
        product: { connect: { id: parseInt(productId) } },
        buyer: { connect: { id: parseInt(buyerId) } },
      },
      include: { product: true, buyer: true },
    });
    console.log("🛒 Item added to cart");
    res.status(200).json({ data: item, message: "🛒 item added to cart" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const cartProducts = await prisma.cartItem.findMany({
      where: { buyerId: parseInt(buyerId) },
      include: { product: true, buyer: true },
    });
    res.status(200).json(cartProducts);
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ error: error.message });
  }
};

export const updateCartProduct = async (req, res) => {
  try {
    const { productId, buyerId } = req.params;
    const { quantity, positive } = req.body;
    console.log(typeof +buyerId);
    console.log(
      "Updating => buyer:",
      buyerId,
      typeof +buyerId,
      "product:",
      productId,
      typeof +productId,
      "newQty:",
      quantity
    );

    // console.log("positive==>", positive);
    const isInCart = await prisma.cartItem.findUnique({
      where: { buyerId_productId: { buyerId: +buyerId, productId: +productId } },
    });

    if (!isInCart) res.status(400).json({ Error: "Not in cart" });
  
    const product = await prisma.cartItem.update({
      where: { buyerId_productId: { buyerId: +buyerId, productId: +productId } },
      data: { quantity: positive ? { increment: 1 } : { decrement: 1 } },
      include: { product: true, buyer: true },
    });
    console.log(`✅ Updated product ${productId} for buyer ${buyerId}: newQty=${quantity}`);

    // console.log("Product updated==>", quantity);
    res.status(200).json({ product: product });
  } catch (error) {
    console.log("error==>", error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteCartProduct = async (req, res) => {
  try {
    const { cartPdtId } = req.params;
    console.log("cartPdtId==>", cartPdtId, typeof cartPdtId);
    const pdt = await prisma.cartItem.delete({
      where: { id: parseInt(cartPdtId) },
    });
    console.log("pdt removed==>", pdt);
    res.status(200).json({ removed: pdt });
  } catch (error) {}
};
