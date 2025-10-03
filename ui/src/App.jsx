import "./App.css";
import {NavBar} from "./ui-component/nav/NavBar"
import {Cart} from "./ui-component/cart/Cart"
import {Home} from "./ui-component/home/Home"
import {Profile} from "./ui-component/profile/Profile"
import {Routes, Route} from "react-router-dom"
import {ProductDetails} from "@/ui-component/products/ProductDetails"

export const App = ()=>{

 return (
    <div className="">
      <div>
         <NavBar/>
         <div className="px-3 sm:p-10 py-4">
            <Routes >
            <Route path="/" element={<Home/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="/:product" element={<ProductDetails/>}/>
            <Route path="cart" element={<Cart/>}/>
         </Routes>
         </div>
      </div>
    </div>
    )
}