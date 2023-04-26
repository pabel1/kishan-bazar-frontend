import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ProductCard from "../Product/ProductCard";

const SubCategoryProduct = () => {
  const [subCategoriesProducts] = useOutletContext();
  return (
    <div className="w-full flex flex-wrap">
      {subCategoriesProducts.blogData?.map((item, index) => (
        <ProductCard data={item} key={index} />
      ))}
    </div>
  );
};

export default SubCategoryProduct;
