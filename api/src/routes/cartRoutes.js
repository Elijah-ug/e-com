import {addCartProduct, getCartProducts} from "../controllers/cartControllers.js";
import express from "express"
const cartRouter = express.Router();

cartRouter.post("/", addCartProduct);
cartRouter.get("/", getCartProducts);
export default cartRouter