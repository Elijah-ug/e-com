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
import { SellerLogin } from "./ui-component/seller/SellerLogin";
import { SellerHome } from "./ui-component/seller/components/SellerHome";
import { SellerSettings } from "./ui-component/seller/components/SellerSettings";
import { SellerNotifications } from "./ui-component/seller/components/SellerNotifications";
import { RemainingProducts } from "./ui-component/seller/components/RemainingProducts";
import { OrderList } from "./ui-component/seller/components/OrderList";
import { SellerProfile } from "./ui-component/seller/components/SellerProfile";
import { SellerProducts } from "./ui-component/seller/components/SellerProducts";
import { ToastContainer } from "react-toastify";
import { RegisterUser } from "./ui-component/profile/RegisterUser";
import { Wallet } from "./ui-component/seller/components/Wallet";
import { AddProduct } from "./ui-component/seller/components/AddProduct";

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
            <Route path="seller-dashboard" element={<SellerDashboard />}>
              <Route path="seller-login" element={<SellerLogin />} />
              <Route path="seller-home" element={<SellerHome />} />
              <Route path="settings" element={<SellerSettings />} />
              <Route path="notifications" element={<SellerNotifications />} />
              <Route path="remaining-products" element={<RemainingProducts />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="profile" element={<SellerProfile />} />
              <Route path="seller-products" element={<SellerProducts />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="add-product" element={<AddProduct />} />
            </Route>
            <Route path="register-user" element={<RegisterUser />} />
            <Route path="register-seller" element={<AuthenticateSeller />} />
          </Routes>
        </div>
      </div>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};
