import React from "react";
const AboutUsCard = ({ Icon, name, details }) => {
  return (
    <div className="w-[15rem] h-[18rem] py-6 rounded-xl flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-tl-[30%] rounded-bl-[30%] rounded-br-[30%] bg-primaryColor flex justify-center items-center transition-all duration-[0.3s] hover:scale-[1.2]">
        <Icon className="text-bgColor text-[3rem]" />
      </div>
      <h4 className="text-[1rem] text-primaryColor font-semibold text-center">
        {name}
      </h4>
      <p className="text-[1rem] text-lightText font-normal text-center">
        {details}
      </p>
    </div>
  );
};

export default AboutUsCard;
