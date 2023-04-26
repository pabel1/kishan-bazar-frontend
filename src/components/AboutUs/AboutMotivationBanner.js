import React from "react";
import aboutus from "../../assets/images/aboutus.jpg";

const AboutMotivationBanner = () => {
  return (
    <div
      // style={{ backgroundImage: `url(${aboutus})` }}
      className={`w-full h-[20rem] px-4 bg-center bg-no-repeat bg-gradient-to-t from-green-200 to-green-500 z-50  rounded-bl-[20%] rounded-br-[20%] mt-16 flex flex-col justify-center items-center gap-10`}
    >
      <h1 className="text-center text-[1.8rem] text-textColor font-semibold">
        We will help you to achieve your goals and to grow your business
      </h1>
      <h4 className="text-textColor text-[1rem]">Feel Free To Contact Us</h4>
      <button className="px-[0.8rem] py-[0.5rem] border border-textColor text-priborder-primaryColor rounded-full transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor hover:border-transparent uppercase">
        Contact Us
      </button>
    </div>
  );
};

export default AboutMotivationBanner;
