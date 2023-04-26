import React from "react";

const CampaignCard = ({ name, image, price, onsale, description }) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center">
      <div className="w-[75%] sm:w-[55%] md:w-[40%] lg:w-[35%]">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt="Campaign"
        />
      </div>
      <div className="w-full lg:w-[20%] h-full"></div>
      <div className="w-full lg:w-[40%] h-full flex flex-col items-center justify-center">
        <h1 className="uppercase text-[1.5rem] font-medium text-textColor mb-2">
          {name}
        </h1>
        <h1 className="text-primaryColor text-[1.2rem] font-semibold mb-2">
          {`$${onsale}`} &nbsp; &nbsp;
          <span className="text-lightText text-[1rem] font-semibold line-through">{`$${price}`}</span>
        </h1>
        <p className="text-lightText text-[1rem] font-normal mb-2 w-[90%]">
          {description}
        </p>
        <button className="px-[0.8rem] py-[0.5rem] border-2 border-secondary text-secondary rounded-full transition-all duration-[0.3s] hover:bg-secondary hover:text-bgColor">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default CampaignCard;
