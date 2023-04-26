import React, { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
const DashboardNavItem = ({ data }) => {
  const [open, setOpen] = useState();
  return (
    <>
      {data && (
        <div className="w-full">
          <div className="w-full flex gap-6 items-center lg:justify-between transition group ">
            <NavLink
              title={data.title}
              to={data?.link}
              className="py-2 flex gap-2 items-center"
            >
              <data.Icon />
              <span className="block text-sm md:hidden lg:block">
                {data.title}
              </span>
            </NavLink>
            {data?.subNav ? (
              <button
                onClick={() => setOpen(!open)}
                className="transition duration-500"
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
                         text-lightText"
                  />
                )}
              </button>
            ) : (
              ""
            )}
          </div>
          {/* for sub menu */}
          <div
            className={`mt-2 transition ${
              open ? "block" : "hidden"
            }  text-secondary whitespace-pre`}
          >
            {data?.subNav?.map((item, i) => {
              return (
                <li className="list-none mb-4 decoration-slate-200" key={i}>
                  <NavLink
                    title={item.title}
                    to={item.link}
                    className="flex gap-x-2 items-center ml-3 text-sm"
                  >
                    <item.Icon />{" "}
                    <span className="hidden lg:block">{item.title}</span>
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

export default DashboardNavItem;
