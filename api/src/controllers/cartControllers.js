import {prisma} from "../../prisma/client.js";
export const addCartProduct = async(req, res) =>{
try{
   const {quantity , productId, buyerId} = req.body;
    const item = await prisma.cartItem.create({
       data:{
       quantity: parseInt(quantity),
       product:{ connect:{id: parseInt(productId)} },
       buyer:{ connect:{id: parseInt(buyerId) } },
        },
        include:{ product: true, buyer: true },
    })
    console.log("🛒 Item added to cart");
    res.status(200).json({data: item, message: "🛒 item added to cart" });
}catch(error){
 console.log(error)
 return res.status(500).json({error: error.message})
}
}

export const getCartProducts = async(req, res) =>{
try{
    const cartProducts = await prisma.cartItem.findMany({
        include:{ product: true, buyer: true }
    });
    res.status(200).json(cartProducts)
}catch(error){
  console.log(error)
  return res.status(500).json({error: error.message})
}
}

export const updateCartProduct = async(req, res) =>{
try{

}catch(error){

}
}

export const deleteCartProduct = async(req, res) =>{
try{

}catch(error){

}
}