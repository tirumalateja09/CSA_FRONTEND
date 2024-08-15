import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSolidOffer } from "react-icons/bi";
import { IoIosHelpBuoy } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { IoFastFoodOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoMdHome } from "react-icons/io";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [check,setCheck]=useState(false)
  const [loginInfo,setLoginInfo]=useState(null)
  const totalItems = useSelector((state) => state.cart.items);


  useEffect(()=>{
    const loginToken= JSON.parse(localStorage.getItem('token'));
    setLoginInfo(loginToken)
    setCheck(!check);

  },[check])



 const loginToggle=()=>{
  if(loginInfo){
    localStorage.removeItem('token')
    // window.location.reload();
    // setCheck(!check)
  }
}


  const totalCount =
    totalItems.length > 0
      ? totalItems.reduce((acc, cur) => acc + cur.count, 0)
      : "";

  return (
    <nav className="bg-pink-500 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <img
            src="https://www.100percentpure.com/cdn/shop/files/100pure-logo_290x.webp?v=1692931061"
            alt="BeautiIcon"
            className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" 
          />
        </div>
        <ul className="flex items-center space-x-4 sm:space-x-6">
          <li className="hidden sm:block">
            <Link
              to="/home"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <IoMdHome />
              <span>Home</span>
            </Link>
          </li>

          <li className="hidden sm:block">
            <Link
              to="/offers"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <BiSolidOffer />
              <span>Offers</span>
            </Link>
          </li>
        
          <li   onClick={loginToggle} className="hidden sm:block">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <FaRegUser />
              <span>{loginInfo?"Logout":"Login"}</span>
            </Link>
          </li>
          <li className="hidden sm:block">
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <TiShoppingCart />
              <span>Cart</span> {totalItems.length > 0 ? `: ${totalCount}` : ""}
            </Link>
          </li>

          {/* Mobile Links */}
          <li className="sm:hidden">
            <Link
              to="/home"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <IoMdHome />
            </Link>
          </li>

          <li className="sm:hidden">
            <Link
              to="/offers"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <BiSolidOffer />
            </Link>
          </li>
         
          <li  onClick={loginToggle}  className="sm:hidden">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <FaRegUser /> <span>{loginInfo?"Logout":"Login"}</span>
            </Link>
          </li>
          <li className="sm:hidden">
            <Link
              to="/cart"
              className="flex items-center space-x-2 text-white hover:text-black transition duration-300"
            >
              <TiShoppingCart />
              {totalItems.length > 0 ? `: ${totalCount}` : ""}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;