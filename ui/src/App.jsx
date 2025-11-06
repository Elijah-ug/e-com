import "./App.css";
import { NavBar } from "./ui-component/nav/NavBar";
import { Cart } from "./ui-component/cart/Cart";
import { Home } from "./ui-component/home/Home";
import { Profile } from "./ui-component/profile/Profile";
import { Routes, Route, Router } from "react-router-dom";
import { ProductDetails } from "@/ui-component/products/ProductDetails";
import { Footer } from "./ui-component/footer/Footer";
import { SellerDashboard } from "./ui-component/seller/SellerDashboard";
import { AuthenticateSeller } from "./ui-component/seller/AuthenticateSeller";

export const App = () => {
  return (
    <div className="">
      <div>
        <div className="z-10">
          <NavBar />
        </div>
        <div className=" ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/:product" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="seller-dashboard" element={<SellerDashboard />} />
            <Route path="register" element={<AuthenticateSeller />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
