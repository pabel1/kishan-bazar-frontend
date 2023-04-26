import React from "react";
import ProductPopUp from "../components/PopUpScreen/ProductPopUp";
import CommonLayout from "./CommonLayout";

const PopUpProductDetails = () => {
  return (
    <>
      {/* <CommonLayout> */}
        <div className="w-full h-full p-10 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-[1000] ">
          <ProductPopUp />
        </div>
      {/* </CommonLayout> */}
    </>
  );
};

export default PopUpProductDetails;
