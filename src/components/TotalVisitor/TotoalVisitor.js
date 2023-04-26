import React from "react";
import countapi from "countapi-js";
import vistior from "../../assets/images/visitor.svg";
import totalvisitorbg from "../../assets/images/totalvisitorbg.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { getTotalVisitorAPI, setTotalVisitorAPI } from "../../api/visitorApi";

const TotoalVisitor = () => {
  const [isVisit, setIsVisit] = useState(false);
  const [visitor, setVisitor] = useState(0);

  // count live visitor
  useEffect(() => {
    JSON.parse(sessionStorage.getItem("visit"))
      ? setIsVisit(false)
      : setIsVisit(true);
    sessionStorage.setItem("visit", JSON.stringify(true));
  }, []);

  useEffect(() => {
    const setTotalVisitor = async () => {
      await setTotalVisitorAPI(); // api call
    };
    if (isVisit) {
      setTotalVisitor();
    }
  }, [isVisit]);

  useEffect(() => {
    const getTotalVisitor = async () => {
      const res = await getTotalVisitorAPI(); // api call
      if (res && res.status === 200) {
        setVisitor(res?.data?.numofVisitor);
      }
    };
    getTotalVisitor();
  }, []);

  return (
    <div
      className="w-full h-[25rem] flex flex-col sm:flex-row gap-4 items-center
     bg-textColor relative bg-opacity-60 "
    >
      <img
        src={totalvisitorbg}
        alt="TotalVisitor"
        className="absolute w-full h-full object-cover object-center z-[-30]"
      />
      <div className="w-full sm:w-[50%] flex flex-col justify-center items-center px-4">
        <h1 className="text-6xl md:text-[4.5rem] text-bgColor font-medium animate-zoomInOut mt-4 sm:mt-0">
          {visitor}
        </h1>
        <hr className="w-[50%] mx-auto border-2 border-primaryColor" />
        <h6 className="text-xl md:text-[2rem] text-lime-100 font-bold text-center mt-4">Total Visitor</h6>
      </div>
      <div className="w-full sm:w-[50%] flex flex-col items-center justify-center my-4">
        <img
          className="w-40 h-40 md:w-80 md:h-80 rounded-full object-contain object-center animate-leftRight border border-bgColor bg-secondary bg-opacity-30"
          src={vistior}
          alt="Visitor"
        />
      </div>
    </div>
  );
};

export default TotoalVisitor;
