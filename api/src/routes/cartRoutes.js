import { verifyToken } from "../../middleware/userRoutes.js";
import {
  addCartProduct,
  deleteCartProduct,
  getCartProducts,
  updateCartProduct,
} from "../controllers/cartControllers.js";
import express from "express";
const cartRoute = express.Router();

cartRoute.post("/", verifyToken, addCartProduct);
cartRoute.get("/", verifyToken, getCartProducts);
cartRoute.put("/:buyerId/:productId", verifyToken, updateCartProduct);
cartRoute.delete("/:cartPdtId", verifyToken, deleteCartProduct);

export default cartRoute;
