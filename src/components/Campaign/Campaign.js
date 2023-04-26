import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation } from "swiper";
import { campaignData } from "../data/data";
import CampaignCard from "./CampaignCard";
const Campaign = () => {
  return (
    <div className="relative w-full flex flex-col justify-center items-center ">
      <div className="my-8 z-[200]">
        <h1 className="text-secondary text-[1.8rem] font-semibold text-center">
          Deal Of The Week
        </h1>
        <h6 className="text-lightText text-[1rem] font-medium">
          Sale off 20% all Products
        </h6>
      </div>
      <div className="absolute lg:static lg:ml-[5rem] top-[75%] left-[50%] translate-x-[-50%] z-[200] w-[25rem] h-[6rem] lg:w-[6rem] lg:h-[25rem] my-4 bg-secondary text-bgColor rounded-full flex flex-row lg:flex-col items-center justify-evenly">
        <div className="w-[4.5rem] h-[4.5rem] rounded-full border-2 border-bgColor bg-bgColor flex flex-col justify-center items-center">
          <h4 className="text-secondary font-semibold">120</h4>
          <h6 className="text-secondary text-[1rem]">Days</h6>
        </div>
        <div className="w-[4.5rem] h-[4.5rem] rounded-full border-2 border-bgColor flex flex-col justify-center items-center">
          <h4 className="font-semibold">12</h4>
          <h6 className="text-[1rem]">Hrs</h6>
        </div>
        <div className="w-[4.5rem] h-[4.5rem] rounded-full border-2 border-bgColor flex flex-col justify-center items-center">
          <h4 className="font-semibold">8</h4>
          <h6 className="text-[1rem]">Mins</h6>
        </div>
        <div className="w-[4.5rem] h-[4.5rem] rounded-full border-2 border-bgColor flex flex-col justify-center items-center">
          <h4 className="font-semibold">7</h4>
          <h6 className="text-[1rem]">Secs</h6>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-auto lg:h-full">
        <Swiper
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          modules={[ Navigation, Autoplay]}
          className="mySwiper w-full h-full mt-[12rem] lg:mt-4"
        >
          {campaignData &&
            campaignData.map((item, index) => (
              <SwiperSlide key={index}>
                <CampaignCard
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  onsale={item.onsale}
                  description={item.description}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Campaign;
