import {NavLink} from "react-router-dom"

export const NavBar = ()=>{

 return (
    <div className="flex items-center justify-between text-sm bg-gray-800 px-10 py-3 text-gray-200 shadow-gray-400 shadow-md hover:shadow-gray-500 hover:shadow-lg transition-all duration-200 mb-5">
<div className="">Eshop</div>
<div className="flex items-center gap-15">
<NavLink to="/">Home</NavLink>
<NavLink to="profile">Profile</NavLink>
<NavLink to="cart">Cart</NavLink>
</div>
    </div>
    )
}