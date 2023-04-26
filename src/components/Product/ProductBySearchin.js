import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllProductsAPI } from "../../api/productApi";
import { GlobalSearchContext } from "../../context";
import ProductPopUp from "../PopUpScreen/ProductPopUp";
import ProductCard from "./ProductCard";

const ProductBySearchin = () => {
  const { globalProducts } = useContext(GlobalSearchContext);

  return (
    <div className="container flex gap-x-4 flex-wrap">
      <ProductPopUp />
      {globalProducts &&
        globalProducts?.length !== 0 &&
        globalProducts?.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      {globalProducts && globalProducts?.length === 0 && (
        <div className="w-full h-full p-16">
          <h1 className="text-center text-base text-gray-400">
            No Products Found
          </h1>
        </div>
      )}
    </div>
  );
};

export default ProductBySearchin;
