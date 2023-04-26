import React, { useContext, useState } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const SideBarItem = ({ category }) => {
  const [open, setOpen] = useState();
 

  // // get all the subcategories
  // const subcategories = products?.filter(
  //   (product) => product.category === data
  // );
  // // get all the unique subcategories
  // const uniquesubcategories = [
  //   ...new Set(subcategories?.map((product) => product["subcategory"])),
  // ];

  const activeNavLink = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#80735F" : " ",
    };
  };

  return (
    <>
      {category && (
        <div className="w-full mt-0">
          <div
            className="w-full flex justify-between gap-3 items-center transition  
            group "
          >
            <NavLink
              to={`/categories/${category?._id}`}
              className="w-[90%] py-2 flex  gap-2 items-center"
            >
              {/* <img className="w-6 object-cover pb-1" src="" alt="" /> */}
              <span className="text-[0.9rem]  group-hover:text-primaryColor whitespace-pre">
                {category?._id}
              </span>
            </NavLink>

            {category?.subcategories && (
              <button
                onClick={() => setOpen(!open)}
                className="w-[10%] transition duration-500 mt-[6px]"
              >
                {open ? (
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    className="group-hover:text-primaryColor opacity-50 rotate-90 text-lg
                     text-lightText "
                  />
                ) : (
                  <MdOutlineKeyboardArrowRight
                    size={30}
                    className="group-hover:text-primaryColor opacity-50 text-lg
                     text-lightText mr-4 "
                  />
                )}
              </button>
            )}
          </div>

          {/* subcategories */}
          <div
            className={`ml-5 mt-2 transition ${
              open ? "block" : "hidden"
            }  text-secondary whitespace-pre`}
          >
            {category?.subcategories?.map((item, i) => {
              return (
                <li
                  className="list-item decoration-slate-200 whitespace-pre my-2"
                  key={i}
                >
                  <NavLink
                    to={`/categories/${category?._id}/${item}`}
                    className="  mt-2 p-1
        "
                  >
                    {/* {<item.dropdownIcon className=" text-lg text-myColor" />} */}
                    <span className=" text-active text-[0.9rem] text-lightText">
                      {item}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarItem;
