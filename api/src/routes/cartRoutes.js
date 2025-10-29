import {
  addCartProduct,
  deleteCartProduct,
  getCartProducts,
  updateCartProduct,
} from "../controllers/cartControllers.js";
import express from "express";
const cartRouter = express.Router();

cartRouter.post("/", addCartProduct);
cartRouter.get("/:buyerId", getCartProducts);
cartRouter.put("/:buyerId/:productId", updateCartProduct);
cartRouter.delete("/:cartPdtId", deleteCartProduct);

export default cartRouter;
