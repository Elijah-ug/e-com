import express from "express";
const router = express.Router();
import {
    addCustomer, getCustomers, updateCustomer, getCustomer, deleteCustomer,
    loginBuyer
} from "../controllers/customerControllers.js"
import { verifyToken } from "../../middleware/userRoutes.js";

router.post("/", addCustomer)
router.get("/", getCustomers)
router.get("/:customer", verifyToken, getCustomer)
router.put("/:customer", verifyToken, updateCustomer)
router.post("/login", loginBuyer)
router.delete("/:customer", deleteCustomer)

export default router