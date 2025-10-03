import express from "express";
const router = express.Router();
import { getProducts, addProduct, deleteProduct, updateProduct, searchProducts, getProduct
 } from "../controllers/productControllers.js";

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/search", searchProducts);
router.get("/:product", getProduct);
router.put("/:product", updateProduct)
router.delete("/:product", deleteProduct);


export default router;
