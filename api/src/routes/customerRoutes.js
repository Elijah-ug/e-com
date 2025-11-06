import express from "express";
const customerRoute = express.Router();
import {
  addCustomer,
  getCustomers,
  updateCustomer,
  getCustomer,
  deleteCustomer,
  loginBuyer,
} from "../controllers/customerControllers.js";
import { verifyToken } from "../../middleware/userRoutes.js";

customerRoute.post("/", addCustomer);
customerRoute.get("/", getCustomers);
customerRoute.get("/customer", verifyToken, getCustomer);
customerRoute.put("/:customer", verifyToken, updateCustomer);
customerRoute.post("/login", loginBuyer);
customerRoute.delete("/:customer", deleteCustomer);

export default customerRoute;
