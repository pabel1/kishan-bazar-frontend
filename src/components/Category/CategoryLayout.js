import React, { useContext, useEffect, useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import {
  getAllSubCategoriesAPI,
  getAlltheSubCategoriesProductAPI,
} from "../../api/productApi";
import { ProductsContext } from "../../context";
import { sidebarData } from "../data/SideBarData";
import ProductPopUp from "../PopUpScreen/ProductPopUp";
import ProductCard from "../Product/ProductCard";
import SubCategoryLink from "./SubCategoryLink";

const CategoryLayout = () => {
  let { categoryname, subcategoryname } = useParams();
  subcategoryname = subcategoryname || 0;
  const [page, setPage] = useState(1);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesProducts, setSubCategoriesProducts] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [price, setPrice] = useState();

  // getting all the categories products
  useEffect(() => {
    const getAllSubCategories = async () => {
      const res = await getAllSubCategoriesAPI(categoryname); // api call
      if (res && res.status === 200) {
        setSubCategories([{ _id: "All" }, ...res.data.resData]);
      }
    };
    getAllSubCategories();
  }, [categoryname]);

  // getting category subcategories product

  useEffect(() => {
    const getAlltheSubCategoriesProduct = async () => {
      const res = await getAlltheSubCategoriesProductAPI(
        categoryname,
        subcategoryname,
        page,
        price
      ); // api call
      if (res && res.status === 200) {
        if (page === 1) {
          setSubCategoriesProducts([...res?.data?.resData[0]?.blogData]);
        } else {
          setSubCategoriesProducts([
            ...subCategoriesProducts,
            ...res?.data?.resData[0]?.blogData,
          ]);
        }
        setProductLength(res?.data?.resData[0]?.total?.[0]?.count);
      }
    };
    getAlltheSubCategoriesProduct();
  }, [categoryname, subcategoryname, price, page]);

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
  console.log(page);
  return (
    <>
      <ProductPopUp />
      {subCategories && (
        <div className=" container mx-auto my-4">
          <div className=" flex items-center justify-between gap-3 flex-wrap">
            <h1 className=" text-2xl font-semibold tracking-tight text-left capitalize">
              {categoryname}
            </h1>
            <div className="flex items-center border-2 rounded-lg py-2 px-3">
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
          </div>
          <div className="flex items-center gap-4 flex-wrap my-4">
            {subCategories?.map((item, i) => (
              <SubCategoryLink
                allPath={`/categories/${categoryname}`}
                data={item}
                key={i}
                setPage={setPage}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-4">
            {/* <Outlet context={[subCategoriesProducts]} /> */}

            {subCategoriesProducts.map((item, index) => (
              <ProductCard data={item} key={index} />
            ))}
          </div>
          {subCategoriesProducts?.length >= 10 &&
            subCategoriesProducts?.length !== productLength && (
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
      )}
    </>
  );
};

export default CategoryLayout;
