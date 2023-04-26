import React, { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/Admin/DashboardNavbar";

const Admin = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className=" relative md:static w-full min-h-screen bg-bgColor flex">
      <div
        className={`${
          toggle ? "left-0" : "left-[-100%]"
        } transition-all duration-[1s] md:left-0 w-[60%] z-[100] md:w-[18%] lg:w-[20%] p-4 md:p-8 min-h-screen
         fixed top-0 bottom-0 bg-gray-200 shadow-lg shadow-black overflow-y-scroll scroll-smooth 
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full `}
      >
        <DashboardNavbar />
      </div>
      <div
        onClick={() => setToggle(!toggle)}
        className="top-0 left-0 z-[120] flex justify-center items-center fixed w-10 h-10 bg-primaryColor rounded-r-lg md:hidden text-white"
      >
        {toggle ? (
          <BsFillArrowLeftCircleFill size={25} className="animate-leftRight" />
        ) : (
          <BsFillArrowRightCircleFill size={25} className="animate-leftRight" />
        )}
      </div>
      <div className="w-full md:w-[80%] md:ml-[20%] p-8 h-full mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
