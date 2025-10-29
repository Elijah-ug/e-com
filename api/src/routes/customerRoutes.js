import express from "express";
const router = express.Router();
import {
    addCustomer, getCustomers, updateCustomer, getCustomer, deleteCustomer,
    loginBuyer
} from "../controllers/customerControllers.js"

router.post("/", addCustomer)
router.get("/", getCustomers)
router.get("/:customer", getCustomer)
router.put("/:customer", updateCustomer)
router.post("/login", loginBuyer)
router.delete("/:customer", deleteCustomer)

export default router