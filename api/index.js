import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoute from "./src/routes/customerRoutes.js";
import productRoute from "./src/routes/productRoutes.js";
import sellerRoute from "./src/routes/sellerRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";

dotenv.config();
const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const products = "/api/products/";
const sellers = "/api/sellers/";
const buyers = "/api/buyers/";
const cart = "/api/cart/";

app.use(products, productRoute);
app.use(sellers, sellerRoute);
app.use(buyers, customerRoute);
app.use(cart, cartRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
