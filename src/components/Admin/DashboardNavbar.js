import React from "react";
import { NavLink } from "react-router-dom";
import { dashboardNavbar } from "../data/data";
import DashboardNavItem from "./DashboardNavItem";
import logo from "../../assets/images/KrishanLogo.png";
const DashboardNavbar = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-start">
      <div className="w-full flex gap-6 items-center justify-between transition group ">
        <NavLink to="/" className="py-2 flex gap-2 items-center">
          <img className="w-32 object-cover" src={logo} alt="Logo" />
        </NavLink>
      </div>
      {dashboardNavbar?.map((item, i) => (
        <DashboardNavItem data={item} key={i} />
      ))}
    </div>
  );
};

export default DashboardNavbar;
