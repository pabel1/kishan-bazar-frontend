import React from "react";
import ProductTable from "../ProductTable";

const AllProducts = () => {
  return (
    <div className="w-full h-[40%] mt-4">
      <h3 className="font-semibold text-textColor mb-2">All Products</h3>
      <ProductTable />
    </div>
  );
};

export default AllProducts;
