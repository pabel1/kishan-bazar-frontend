import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import ProductPopUp from "../components/PopUpScreen/ProductPopUp";
import SideBar from "../components/SideBar/SideBar";
import { CartContext } from "../context";

const DynamicLayout = () => {
  const { cartState } = useContext(CartContext);
  return (
    <>
      <NavBar />
      <SideBar />

      <div
        className={`w-full lg:w-[80%]   lg:ml-[20%] px-1 
        ${cartState.length !== 0 && "md:pr-[10%]"}`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default DynamicLayout;
