import React from "react";
import DiscountTable from "../DiscountTable";

const AllDiscountProducts = () => {
  return (
    <div className="w-full h-[40%] mt-4">
      <h3 className="font-semibold text-textColor mb-2">All Products</h3>
      <DiscountTable />
    </div>
  );
};

export default AllDiscountProducts;
