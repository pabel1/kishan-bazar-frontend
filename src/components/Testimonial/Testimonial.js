import React, { useEffect, useState } from "react";
import testimonial from "../../assets/images/testimonial.jpg";
import { getAllClientsAPI } from "../../api/clientApi";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay } from "swiper";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const getAllClients = async () => {
      const res = await getAllClientsAPI(); // api call
      if (res && res.status === 200) {
        setClients([...clients, ...res.data.clients]);
      }
    };
    getAllClients();
  }, []);
  return (
    <div
      className="w-full h-[25rem] overflow-hidden relative flex justify-center items-center bg-fixed sm:bg-left md:bg-right lg:bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${testimonial})` }}
    >
      <h2
        className="absolute top-[10%] left-[50%] translate-x-[-50%] text-[1.8rem] text-semibold text-secondary"
        src={testimonial}
        alt="Testimonial"
      >
        Client Says
      </h2>
      <div className="z-[100] w-[80%] md:w-[50%] lg:w-[40%] h-64 flex justify-center items-center mt-4">
        <Swiper
          direction={"vertical"}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-full h-full"
        >
          {clients?.map((item, index) => (
            <SwiperSlide key={index}>
              <TestimonialCard
                name={item.name}
                comment={`"${item.description}"`}
                image={item.image?.url}
                designation={item.designation}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
