import React, { useEffect, useRef, useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import {
  getAllDiscountCategoriesAPI,
  getAllDiscountCategoriesProductsAPI,
} from "../../api/discountApi";
import SubCategoryLink from "../Category/SubCategoryLink";
import DiscountProductCard from "../Product/DiscountProductCard";
import DiscountProducts from "./DiscountProducts";

const DiscountCategory = () => {
  const { categoryname } = useParams();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState([]);
  const [categoriesProduct, setCategiriesProduct] = useState([]);
  const [discountProductLength, setDiscountProductLength] = useState(0);
  const [price, setPrice] = useState(0);

  // geting all the categories
  useEffect(() => {
    const getAllDiscountCategories = async () => {
      const res = await getAllDiscountCategoriesAPI(); // api call
      if (res && res.status === 200) {
        setCategory([{ _id: "All" }, ...res.data.resData]);
      }
    };
    getAllDiscountCategories();
  }, []);

  useEffect(() => {
    const getAllDiscountCategoriesProducts = async () => {
      const res = await getAllDiscountCategoriesProductsAPI(
        categoryname,
        price,
        page
      ); // api call
      if (res && res.status === 200) {
        if (page === 1) {
          setCategiriesProduct([...res.data.resData[0].blogData]);
        } else {
          setCategiriesProduct([
            ...categoriesProduct,
            ...res.data.resData[0].blogData,
          ]);
        }
        setDiscountProductLength(res?.data?.resData[0]?.total?.[0]?.count);
      }
    };
    getAllDiscountCategoriesProducts();
  }, [categoryname, price, page]);

  // infinity scrolling
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 1 >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     setPage((prev) => prev + 1);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  console.log();
  return (
    <div>
      <div className=" flex items-start justify-between">
        <div className=" flex flex-col ">
          <div className=" self-end flex items-center border-2 rounded-lg py-2 px-3">
            <RiArrowUpDownLine />
            <select
              className=" px-6 py-1 bg-transparent  text-zinc-600 outline-none"
              name="sortbyprice"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              //   onChange={perPageHandler}
            >
              <option> Sort by best match</option>
              <option value={-1}>Price: Highest First</option>
              <option value={1}>Price: Lowest First</option>
            </select>
          </div>
          <div>
            <div className=" container flex items-center gap-4 flex-wrap my-4">
              {category?.map((item, i) => (
                <SubCategoryLink
                  allPath="/discount"
                  data={item}
                  key={i}
                  setPage={setPage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-4">
        {categoriesProduct &&
          categoriesProduct?.map((item, index) => (
            <DiscountProductCard data={item} key={index} />
          ))}

        {/* {categoryname ? (
          categoriesProduct.map((item, index) => (
            <DiscountProductCard data={item} key={index} />
          ))
        ) : (
          <DiscountProducts />
        )} */}
      </div>
      {categoriesProduct?.length >= 10 &&
        categoriesProduct?.length !== discountProductLength && (
          <div
            className="w-full flex justify-center items-center my-4"
            onClick={() => setPage(page + 1)}
          >
            <span
              className={` cursor-pointer text-sm px-2 py-1 rounded-full bg-primaryColor text-white flex items-center gap-x-2 w-fit text-center`}
            >
              <TfiReload /> Load More
            </span>
          </div>
        )}
    </div>
  );
};

export default DiscountCategory;
