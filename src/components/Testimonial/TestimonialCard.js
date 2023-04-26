import React from "react";

const TestimonialCard = ({ name, comment, image, designation }) => {
  return (
    <div className="h-80 p-5 z-[100] rounded-xl w-full flex flex-col justify-center items-center bg-lime-100">
      <img
        className="w-[4rem] h-[4rem] rounded-full object-contain"
        src={image}
        alt="Client1"
      />
      <h3 className="text-secondary text-[1.3rem]">{name}</h3>
      <h6 className="text-[0.8rem] text-lightText font-normal">
        {designation}
      </h6>
      <div className="h-24 overflow-auto mb-8 mt-2">
        <p className="text-xs text-lightText font-normal text-center ">
          {comment}
        </p>
      </div>
    </div>
  );
};
export default TestimonialCard;
