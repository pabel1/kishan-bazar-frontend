import React from "react";

const AboutGetStarted = ({ img }) => {
  return (
    <div className="my-8 w-full h-[20rem] flex flex-col gap-4 items-center justify-center bg-secondary relative bg-opacity-80">
      <img
        src={img}
        alt="TotalVisitor"
        className="absolute w-full h-full object-cover object-center z-[-30]"
      />
      <h5 className="text-[1rem] text-bgColor font-normal">
        ARE YOU READY FOR
      </h5>
      <h1 className="text-center text-bgColor text-[1.8rem] font-semibold">
        Lets Get Started Your Project
      </h1>
      <button className="px-[0.8rem] py-[0.5rem] border border-bgColor text-bgColor rounded-full transition-all duration-[0.3s] hover:bg-bgColor hover:text-primaryColor hover:border-transparent uppercase">
        Start Now
      </button>
    </div>
  );
};

export default AboutGetStarted;

{
  /* <div className="my-8 w-full h-[25rem] flex gap-4 items-center bg-textColor relative bg-opacity-60">
  <img
    src={totalvisitorbg}
    alt="TotalVisitor"
    className="absolute w-full h-full object-cover object-center z-[-30]"
  />
  <div className="w-[50%] flex flex-col justify-center items-center">
    <h1 className="text-[4.5rem] text-bgColor font-medium animate-zoomInOut">
      200
    </h1>
    <hr className="w-[50%] mx-auto border-2 border-primaryColor" />
    <h6 className="text-[2rem] text-lime-100 font-bold">Total Visitor</h6>
  </div>
  <div className="w-[50%] flex flex-col items-center justify-center my-4">
    <img
      className="w-80 h-80 rounded-full object-contain object-center animate-leftRight border border-bgColor bg-secondary bg-opacity-30"
      src={vistior}
      alt="Visitor"
    />
  </div>
</div>; */
}
