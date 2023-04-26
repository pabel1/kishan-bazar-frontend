import React, { useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import SubCategoryLink from "../Category/SubCategoryLink";
import { sidebarData } from "../data/SideBarData";

export const CategoriesProductSidebar = () => {
  const { categoryname } = useParams();
  const [data, setData] = useState(sidebarData);

  return (
    <>
      {data && (
        <div className=" w-[95%] mx-auto my-4">
          <div className="flex flex-col items-start gap-5">
            {data[0]?.subCategory?.map((item, i) => (
              <li className="list-item decoration-slate-200 " key={i}>
                <NavLink
                  to={`${item.subLink}`}
                  className={`border-transparent
         hover:text-secondary hover:border-secondary rounded-full`}
                >
                  {item.subTitle}
                </NavLink>
              </li>
            ))}
          </div>
          <div>
            {/* subcategory items */}
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};
