import express from "express";
const sellerRoute = express.Router();
import {
  addSeller,
  getSellers,
  getSeller,
  updateSeller,
  deleteSeller,
  loginSeller,
} from "../controllers/sellerControllers.js";
import { verifyToken } from "../../middleware/userRoutes.js";
import { getOrderedProducts, getRemainingProducts, sellerProducts } from "../controllers/sellerFuncs.js";

sellerRoute.post("/", addSeller);
sellerRoute.get("/", getSellers);

sellerRoute.post("/login", loginSeller);
sellerRoute.get("/seller", verifyToken, getSeller);
sellerRoute.get("/seller/products", verifyToken, sellerProducts);
sellerRoute.get("/seller/remaining-products", verifyToken, getRemainingProducts)
sellerRoute.put("/:seller", verifyToken, updateSeller);
sellerRoute.get("/seller/ordered-products", verifyToken, getOrderedProducts);
sellerRoute.delete("/:seller", verifyToken, deleteSeller);

export default sellerRoute;
