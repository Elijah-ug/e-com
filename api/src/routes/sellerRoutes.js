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

sellerRoute.post("/", addSeller);
sellerRoute.get("/", getSellers);
sellerRoute.post("/login", loginSeller);
sellerRoute.get("/seller", verifyToken, getSeller);
sellerRoute.put("/:seller", verifyToken, updateSeller);
sellerRoute.delete("/:seller", verifyToken, deleteSeller);

export default sellerRoute;
