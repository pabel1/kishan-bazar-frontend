import React from "react";
import { NavLink, useParams } from "react-router-dom";

export const SubCategoryProductSidebar = ({ data, item, i }) => {
  return (
    <div>
      {data?.subCategory?.map((item, i) => {
        return (
          <li className="list-item decoration-slate-200 " key={i}>
            <NavLink
              to={item.subLink}
              className=" flex items-center gap-2 mt-2 p-1
"
            >
              {/* {<item.dropdownIcon className=" text-lg text-myColor" />} */}
              <span className=" text-active text-base">{item.subTitle}</span>
            </NavLink>
          </li>
        );
      })}
    </div>
  );
};
