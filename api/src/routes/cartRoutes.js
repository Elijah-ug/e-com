import { verifyToken } from "../../middleware/userRoutes.js";
import {
  addCartProduct,
  deleteCartProduct,
  getCartProducts,
  updateCartProduct,
} from "../controllers/cartControllers.js";
import express from "express";
const cartRouter = express.Router();

cartRouter.post("/", verifyToken, addCartProduct);
cartRouter.get("/:buyerId", verifyToken, getCartProducts);
cartRouter.put("/:buyerId/:productId", verifyToken, updateCartProduct);
cartRouter.delete("/:cartPdtId", verifyToken, deleteCartProduct);

export default cartRouter;
