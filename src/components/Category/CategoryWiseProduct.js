import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "../Product/ProductCard";
import { MdArrowForwardIos } from "react-icons/md";
const CategoryWiseProduct = ({ products, category }) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };
  const [productsData, setProductsData] = useState([]);

  // get all the products of a category
  useEffect(() => {
    setProductsData([
      ...products.filter((product) => product.category === category),
    ]);
  }, []);

  return (
    <>
      <div className=" my-8 px-5">
        <div className=" flex items-center gap-5">
          <h1 className=" text-base md:text-2xl font-semibold whitespace-pre">{category}</h1>
          <hr className="w-[70%] text-lightText font-bold border" />
          <Link
            to={`/categories/${category}`}
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
        <div className=" my-5 flex items-center gap-2  ">
          <Swiper
            slidesPerView={6}
            spaceBetween={2}
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
            {productsData?.map((item, i) => (
              <SwiperSlide key={i}>
                <ProductCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default CategoryWiseProduct;
