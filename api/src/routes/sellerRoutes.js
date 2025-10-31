import express from "express";
const router = express.Router();
import { addSeller, getSellers, getSeller, updateSeller, deleteSeller } from "../controllers/sellerControllers.js";
import { verifyToken } from "../../middleware/userRoutes.js";

router.post("/", addSeller);
router.get("/", getSellers);
router.get("/seller", verifyToken, getSeller);
router.put("/:seller", verifyToken, updateSeller);
router.delete("/:seller", verifyToken, deleteSeller);

export default router;
