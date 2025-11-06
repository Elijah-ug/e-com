import express from "express";
import {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  searchProducts,
  getProduct,
} from "../controllers/productControllers.js";
import { upload } from "../../utils/utils.js";
import { verifyToken } from "../../middleware/userRoutes.js";
import { uploadToUploadCare } from "../../middleware/uploadToUploadCare.js";
const productRoute = express.Router();

productRoute.get("/", getProducts);
productRoute.post("/add-product", verifyToken, upload.single("file"), uploadToUploadCare, addProduct);
productRoute.post("/login", addProduct);
productRoute.get("/search", searchProducts);
productRoute.get("/:product", getProduct);
productRoute.put("/:product", updateProduct);
productRoute.delete("/:product", deleteProduct);
// multer route
// productRoute.post("/upload", )

export default productRoute;
