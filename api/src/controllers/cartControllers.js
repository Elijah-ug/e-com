import { prisma } from "../../prisma/client.js";
export const addCartProduct = async (req, res) => {
  const buyerId = req.user.id;
  console.log("buyerId && ==>", buyerId, typeof buyerId);
  try {
    const { quantity, productId } = req.body;
    const item = await prisma.cartItem.create({
      data: {
        quantity: parseInt(quantity),
        product: { connect: { id: parseInt(productId) } },
        buyer: { connect: { id: buyerId } },
      },
      include: { product: true, buyer: true },
    });
    console.log("waiting for db to add");
    if (!item.product.isOrdered) {
      await prisma.product.update({
        where: { id: item.product.id },
        data: { isOrdered: true },
      });
      console.log("ordered");
    }
    console.log("🛒 Item added to cart", item);
    res.status(200).json({ data: item, message: "🛒 item added to cart" });
  } catch (error) {
    console.log("error in addToCart==>", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getCartProducts = async (req, res) => {
  const { buyerId } = req.user.id;
  try {
    const total = await prisma.cartItem.findMany({
      where: { buyerId },
      include: {
        buyer: true,
        product: true,
      },
    });
    // get total cart products for a logged in buyer
    const totalCartItems = total.reduce((sum, prod) => prod.quantity + sum, 0);
    // get total cost of cart products for a logged in buyer
    const totalTx = total.reduce((sum, prod) => prod.product.price * prod.quantity + sum, 0);
    const tax = (process.env.TAX * totalTx).toFixed(2);
    const net = totalTx - tax;
    console.log("totalCartItems ==>", totalCartItems, "amount==>", totalTx, "Tax==>", tax, "net==>", net);

    res.status(200).json({
      data: total,
      totalCartProducts: totalCartItems,
      totalCost: totalTx,
      totalTax: tax,
      tax: process.env.TAX,
      netCost: net,

      message: "✅ cart products fetched",
    });
  } catch (error) {
    console.log("error in getCartProducts ==>", error.message);
    return res.status(500).json({ error: error });
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
    console.log("error==>", error.message);
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
