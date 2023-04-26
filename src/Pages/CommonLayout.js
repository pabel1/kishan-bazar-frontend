import React, { useContext } from "react";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import { CartContext } from "../context";

const CommonLayout = ({ children }) => {
  const { cartState } = useContext(CartContext);
  return (
    <>
      <NavBar />
      <SideBar />

      <div
        className={`w-full lg:w-[80%]   lg:ml-[20%] px-1 
        ${cartState.length !== 0 && "md:pr-[10%]"}`}
      >
        {children}
      </div>
    </>
  );
};

export default CommonLayout;

{
  /* <div
  className="hidden md:flex   w-full lg:w-[20%] h-20 lg:h-screen flex-col justify-center 
          lg:block fixed top-[22%] 
          lg:top-[20%] left-0 bottom-0 z-[100] overflow-y-scroll scroll-smooth 
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
>
  <SideBar />
</div>; */
}
