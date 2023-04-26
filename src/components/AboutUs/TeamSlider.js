import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import person1 from "../../assets/images/client1.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";
import { getAllTeamAPI } from "../../api/teamApi";

const TeamCard = ({ name, designation, image, description }) => {
  return (
    <div className="flex flex-col items-center gap-y-2 shadow-lg p-4">
      <div className="">
        <img className="w-[5rem] h-[5rem] rounded-full" src={image} alt="" />
      </div>
      <h1>{name}</h1>
      <h4>{designation}</h4>
      <p className="text-center">{description}</p>
    </div>
  );
};
const TeamSlider = () => {
  const [teamsData, setTeamsData] = useState([]);
  useEffect(() => {
    const getAllTeams = async () => {
      const res = await getAllTeamAPI(); //api call
      if (res && res.status === 200) {
        setTeamsData([...res.data.teams]);
      }
    };
    getAllTeams();
  }, []);
  return (
    <div className="my-10 flex flex-col gap-y-4">
      <h1 className="text-[1.2rem] text-textColor font-semibold text-center">
        Meet Out Expert Team Member
      </h1>
      <div className="p-4">
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
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
              slidesPerView: 2,
            },
          }}
        >
          {teamsData?.map((item, index) => (
            <SwiperSlide key={index}>
              <TeamCard
                name={item.name}
                designation={item.designation}
                image={item.image.url}
                description={item.description}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TeamSlider;
