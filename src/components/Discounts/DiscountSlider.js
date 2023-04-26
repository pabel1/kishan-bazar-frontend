import React, { useEffect, useState } from "react";
import { getAllDiscountsAPI } from "../../api/discountApi";
import CommonLayout from "../../Pages/CommonLayout";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { MdArrowForwardIos } from "react-icons/md";
import DiscountProductCard from "../Product/DiscountProductCard";

const DiscountSlider = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [discountsData, setDiscountsData] = useState([]);
  // getting all discounts
  useEffect(() => {
    const getAllDiscounts = async () => {
      const res = await getAllDiscountsAPI(); //api call
      if (res && res.status === 200) {
        setDiscountsData([...discountsData, ...res.data.products]);
      }
    };
    getAllDiscounts();
  }, []);
  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };
  return (
    <div className="  px-5">
      <div className=" flex items-center gap-5">
        <h1
          className=" inline-block text-base md:text-2xl whitespace-pre text-secondary font-semibold pb-2 border-b-[3px]
       border-secondary "
        >
          Discounts Products
        </h1>
        <hr className="w-[70%] text-lightText font-bold border" />
        <Link
          to={`/discount`}
          className=" text-secondary whitespace-pre font-semibold"
        >
          View All
        </Link>
        <div className=" text-secondary flex gap-8">
          <MdArrowForwardIos
            size={20}
            className="rotate-180 cursor-pointer"
            onClick={prevHandler}
          />
          <MdArrowForwardIos
            size={20}
            className="cursor-pointer"
            onClick={nextHandler}
          />
        </div>
      </div>
      <div className=" my-5 flex items-center gap-2 ">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          slidesPerGroup={1}
          loop={true}
          loopFillGroupWithBlank={true}
          onSwiper={(swiper) => setSwiperRef(swiper)}
          className="mySwiper w-full h-full"
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 4,
            },
            // when window width is >= 480px
            390: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            400: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
            500: {
              slidesPerView: 3,
              spaceBetween: 1,
            },
            540: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            // when window width is >= 640px
            // 990: {
            //   slidesPerView: 5,
            //   spaceBetween: 2,
            // },
            992: {
              slidesPerView: 4,
              spaceBetween: 2,
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
            1294: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
            1396: {
              slidesPerView: 5,
              spaceBetween: 2,
            },
            1400: {
              slidesPerView: 6,
              spaceBetween: 4,
            },
          }}
        >
          {discountsData?.map((item, i) => (
            <SwiperSlide key={i}>
              <DiscountProductCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountSlider;
