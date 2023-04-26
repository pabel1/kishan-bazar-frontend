import React, { useState } from "react";
import ProductCard from "../Product/ProductCard";

const NewArrival = ({ productsData }) => {
  const [tab, setTab] = useState(1);

  return (
    <div className=" px-8 ">
      <div className=" flex flex-col items-center justify-center  my-10">
        <h1
          className=" text-4xl text-secondary font-semibold pb-2 border-b-[3px]
       border-secondary "
        >
         Discounts
        </h1>
        <div className="flex items-center gap-6 px-2 py-2 text-lightText">
          {productsData
            .reverse()
            ?.slice(0, 5)
            .map((item, index) => (
              <div
                key={index}
                className=" px-2  flex flex-col items-center justify-center my-5 group
         cursor-pointer"
                onClick={() => setTab(1)}
              >
                <img
                  className=" w-12 object-contain group-hover:scale-[1.1] transition-all duration-700 "
                  src={item.image}
                  alt="Product"
                />
                <h1 className=" text-base whitespace-pre font-semibold group-hover:text-primaryColor ">
                  {item.category}
                </h1>
              </div>
            ))}
        </div>

        {/* new arrival product card */}
      </div>
      <div className=" my-5 flex items-center gap-2 ">
        {Array(6)
          .fill()
          .map((item, i) => (
            <ProductCard key={i}/>
          ))}
      </div>
    </div>
  );
};

export default NewArrival;
