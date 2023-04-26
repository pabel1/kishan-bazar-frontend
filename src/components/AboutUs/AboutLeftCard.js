import React from "react";

const AboutLeftCard = ({ Icon, name, details }) => {
  return (
    <div className="flex justify-between gap-x-4 items-center">
      <div className="w-20 h-20 rounded-tl-[30%] rounded-bl-[30%] rounded-br-[30%] bg-primaryColor flex justify-center items-center">
        <Icon className="text-bgColor text-[3rem]" />
      </div>
      <div className="w-[80%]">
        <h3 className="text-textColor text-[1.2rem]">{name}</h3>
        <p className="text-[0.8rem] text-lightText font-normal">{details}</p>
      </div>
    </div>
  );
};

export default AboutLeftCard;
