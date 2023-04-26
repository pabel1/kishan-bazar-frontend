import React from "react";
import { Link } from "react-router-dom";
const Discount = ({ paginationLink }) => {
  return (
    <div className=" container my-5  ">
      <div className=" text-center flex items-center justify-between ">
        <h1
          className=" inline-block text-4xl text-secondary font-semibold pb-2 border-b-[3px]
       border-secondary "
        >
          Discount's Products
        </h1>
        <div className=" text-right ">
          {paginationLink && (
            <Link
              to={"/discount"}
              className=" text-right text-secondary whitespace-pre font-semibold"
            >
              View All
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discount;
