import express from "express";
const router = express.Router();
import { getProducts, addProduct, getProduct, deleteProduct } from "../controllers/ecomControllers.js";

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
export default router;
