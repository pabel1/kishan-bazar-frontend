import React from "react";

import Discount from "../components/Discounts/Discount";
import DiscountCategory from "../components/Discounts/DiscountCategory";
import DiscountProducts from "../components/Discounts/DiscountProducts";
import ProductPopUp from "../components/PopUpScreen/ProductPopUp";
import CommonLayout from "./CommonLayout";

const DiscountPage = () => {
  return (
    <>
      <ProductPopUp />
      <CommonLayout>
        <Discount />
        <DiscountCategory />
      </CommonLayout>
    </>
  );
};

export default DiscountPage;
