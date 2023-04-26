import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const SubCategoryLink = ({ data, setPage }) => {
  return (
    <div className="my-3">
      <NavLink
        onClick={() => setPage(1)}
        to={`${data._id}`}
        className={`py-2 px-4 font-medium border border-transparent bg-gray-200
         hover:bg-transparent hover:text-secondary hover:border-secondary rounded-full`}
      >
        {data._id}
      </NavLink>
    </div>
  );
};

export default SubCategoryLink;
