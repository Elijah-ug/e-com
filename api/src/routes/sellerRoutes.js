import express from "express"
const router = express.Router()
import {addSeller, getSellers, getSeller, updateSeller, deleteSeller} from "../controllers/sellerControllers.js"

router.post("/", addSeller)
router.get("/", getSellers)
router.get("/:seller", getSeller)
router.put("/:seller", updateSeller)
router.delete("/:seller", deleteSeller)

export default router