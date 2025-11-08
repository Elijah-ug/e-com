import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import customerRoute from "./src/routes/customerRoutes.js";
import productRoute from "./src/routes/productRoutes.js";
import sellerRoute from "./src/routes/sellerRoutes.js";
import cartRoute from "./src/routes/cartRoutes.js";

dotenv.config();
const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "https://shopping-cart-mauve-theta.vercel.app"],

  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: ["Content-Type", "Authorization"],
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
app.use(cart, cartRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
