import React, { useContext, useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import {
  getAllCategoriesAndSubcategoriesAPI,
  getAllCategoriesAPI,
} from "../../api/productApi";
import { ProductsContext } from "../../context";
import { sidebarData } from "../data/SideBarData";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
  const [sidebar] = useState(sidebarData);
  const [toggle, setToggle] = useState(false);

  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    const getAllCategories = async () => {
      // const res = await getAllProductsAPI();
      const res = await getAllCategoriesAndSubcategoriesAPI();
      if (res && res.status === 200) {
        setCategoriesData([...res?.data?.products]);
      }
    };
    getAllCategories();
  }, []);

  // // get all the categories
  // const categories = [
  //   ...new Set(productsData?.map((product) => product["category"])),
  // ];

  return (
    <>
      <div>
        <div
          className={`${
            toggle ? "left-0" : "left-[-100%]"
          } transition-all duration-[1s] bg-white lg:left-0 w-[60%] z-[100] md:w-[30%] lg:w-[20%] px-4 pt-16 sm:pt-10 md:p-4 md:pt-14 lg:pt-4 min-h-[70vh]
         fixed top-[17%] bottom-0 md:shadow-lg lg:shadow shadow-black overflow-y-auto scroll-smooth 
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full my-14`}
        >
          {categoriesData?.map((item, i) => (
            <SideBarItem category={item} key={i} />
          ))}
        </div>
        <div
          onClick={() => setToggle(!toggle)}
          className="left-0 z-[120] flex justify-center items-center fixed w-10 h-10 bg-primaryColor rounded-r-lg lg:hidden text-white"
        >
          {toggle ? (
            <BsFillArrowLeftCircleFill
              size={25}
              className="animate-leftRight"
            />
          ) : (
            <BsFillArrowRightCircleFill
              size={25}
              className="animate-leftRight"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
