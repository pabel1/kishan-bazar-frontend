import React, { useEffect, useState } from "react";
import bannerA from "../../assets/images/bannerA.jpg";
import bannerB from "../../assets/images/bannerB.jpg";
import bannerC from "../../assets/images/bannerC.jpg";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectFade, Pagination } from "swiper";
import { getAllCampaignsAPI } from "../../api/campaignApi";
import { CiDiscount1 } from "react-icons/ci";
import { MdLocalOffer } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const [campaignsData, setCampaignsData] = useState([]);
  // getting all campaigns
  useEffect(() => {
    const getAllCampaigns = async () => {
      const res = await getAllCampaignsAPI(); //api call
      if (res && res.status === 200) {
        setCampaignsData([...campaignsData, ...res.data.campaigns]);
      }
    };
    getAllCampaigns();
  }, []);
  console.log(campaignsData);
  return (
    <div className="w-full h-[20rem] ">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper w-full h-full"
      >
        {campaignsData?.reverse().map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[25rem] flex gap-2 items-center bg-textColor 
            relative bg-opacity-70 "
            >
              <img
                src={item?.image?.url}
                alt="TotalVisitor"
                className="absolute w-full h-full object-cover object-center z-[-30]"
              />
              <h1 className="absolute text-base md:text-[2rem] font-bold text-lime-100 top-[5%] md:top-[10%] left-[8%] flex items-center gap-x-1">
                <MdLocalOffer className="text-[4rem] text-yellow-400" />
                {item.campaignname}
              </h1>
              <div className=" container w-full flex flex-col gap-y-4 md:gap-y-12 justify-center items-center">
                <h6 className=" mt-3 text-base md:text-[2rem] text-lime-100 font-bold">
                  {item.category}
                </h6>
                <h1 className="text-3xl md:text-[4.5rem] text-bgColor font-medium animate-upDown">
                  Get Upto {item.discount}% Off
                </h1>
                <button
                  onClick={() => navigate("/discount")}
                  className="mb-4 rounded-full text-primaryColor font-semibold transition-all duration-[0.3s]  bg-bgColor hover:bg-secondary hover:text-bgColor text-[1rem] px-[0.8rem] py-[0.5rem]"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
