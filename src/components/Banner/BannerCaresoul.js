import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";

import { bannerData } from "../data/data";
import { getAllCampaignsAPI } from "../../api/campaignApi";
import { useNavigate } from "react-router-dom";

const BannerCaresoulCard = ({ heading, text, image }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative flex bg-bgColor flex-col  w-full h-[15rem] group overflow-hidden">
        <div className="absolute  w-full h-full  top-0 left-0 z-[10] flex flex-col
         justify-between items-start p-4 ">
          <h3 className="text-secondary text-[20px] font-semibold mb-2">
            {heading}
          </h3>
          <p className="text-left text-lightText mb-4 w-44">{text} </p>

          <img

            className="absolute z-[-10]  block top-[30%] right-[2%] w-36 h-36 rounded-full object-cover hover:overflow-hidden transition-all duration-[0.3s] group-hover:scale-[1.2] "
            src={image?.url}
            alt="Banner"
          />

          <button
            onClick={() => navigate("/discount")}
            className="mb-4  rounded-full text-bgColor font-semibold transition-all duration-[0.3s] border hover:border-primaryColor bg-secondary hover:bg-bgColor hover:text-secondary text-sm px-[0.8rem] py-[0.5rem]"

          >
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

const BannerCaresoul = () => {
  const [campaignsData, setCampaignsData] = useState([]);
  // getting all campaigns
  useEffect(() => {
    const getAllCampaigns = async () => {
      const res = await getAllCampaignsAPI(); //api call
      if (res && res.status === 200) {
        setCampaignsData([ ...res.data.campaigns]);
      }
    };
    getAllCampaigns();
  }, []);

  return (
    <div className="w-full h-[20rem]">
      <Swiper
        slidesPerView={3}
        spaceBetween={4}
        slidesPerGroup={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        modules={[Autoplay]}
        loopFillGroupWithBlank={true}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 640px
          920: {
            slidesPerView: 3,
          },
        }}
      >
        {campaignsData &&
          campaignsData.map((item, index) => (
            <SwiperSlide key={index}>
              <BannerCaresoulCard
                heading={item.category}
                text={item.campaignname}
                image={item.image}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default BannerCaresoul;
