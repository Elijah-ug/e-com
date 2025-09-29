import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/routes.js";
dotenv.config();
const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const ecomv1 = "/ecomv1/api/";
app.use(ecomv1, router);
app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
