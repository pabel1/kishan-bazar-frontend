import React, { useEffect, useState } from "react";
import { getAllAboutsAPI } from "../api/aboutApi";
import aboutus from "../assets/images/aboutus.jpg";
import AboutGetStarted from "../components/AboutUs/AboutGetStarted";
import AboutLeftCard from "../components/AboutUs/AboutLeftCard";
import AboutMotivationBanner from "../components/AboutUs/AboutMotivationBanner";
import AboutUsCard from "../components/AboutUs/AboutUsCard";
import TeamSlider from "../components/AboutUs/TeamSlider";
import { aboutCardData, aboutleftCardData } from "../components/data/data";
import Footer from "../components/Footer/Footer";
import CommonLayout from "./CommonLayout";
const AboutUs = () => {
  const [aboutData, setAboutData] = useState({});
  useEffect(() => {
    const getAllAbouts = async () => {
      const res = await getAllAboutsAPI(); //api call
      if (res && res.status === 200) {
        setAboutData({ ...res.data.about[res.data.about.length - 1] });
      }
    };
    getAllAbouts();
  }, []);
  return (
    <CommonLayout>
      <div className="w-full px-20 my-14">
        <h2 className="text-center text-secondary font-medium text-[1.4rem] tracking-widest uppercase">
          Why Choose Us
        </h2>
        {/* about why choose us details */}
        <div className="w-full flex flex-col mt-10 gap-8">
          <h1 className="text-[1.8rem] font-medium text-secondary">
            {Object.keys(aboutData).length1 !== 0 && aboutData.title}
          </h1>
          <div className="w-full h-full flex flex-col lg:flex-row items-center gap-8 ">
            <div className=" w-full lg:w-[60%] flex flex-col  gap-4">
              {/* aboutus left card */}
              {aboutleftCardData &&
                aboutleftCardData.map((item, index) => (
                  <AboutLeftCard
                    key={index}
                    Icon={item.icon}
                    name={item.name}
                    details={item.details}
                  />
                ))}
            </div>
            {/* aboutus right image */}
            <div className="w-[80%] lg:w-[50%] h-full group overflow-hidden">
              <img
                className="w-full h-full object-cover transition-all duration-[0.5s] group-hover:scale-[1.1]"
                src={
                  Object.keys(aboutData).length1 !== 0 && aboutData.groupphoto
                }
                alt="AboutUs"
              />
            </div>
          </div>
        </div>

        {/* about motivation card */}
        <AboutMotivationBanner />

        {/* aboutus cards */}
        <div className="w-full px-20 flex gap-4 justify-evenly flex-wrap mt-10">
          {aboutCardData &&
            aboutCardData.map((item, index) => (
              <AboutUsCard
                key={index}
                Icon={item.icon}
                name={item.name}
                details={item.details}
              />
            ))}
        </div>

        {/* who we are */}
        <div className="w-full flex flex-col items-center mt-6 gap-y-6">
          <h6 className="text-primaryColor text-[1rem] uppercase font-medium">
            Who we are
          </h6>
          <h1 className="text-[1.8rem] font-medium text-secondary">
            {Object.keys(aboutData).length1 !== 0 && aboutData.subHeader}
          </h1>
          <div className="flex flex-col lg:flex-row">
            {/* who we are left image */}
            <div className="w-[80%] h-[80%] mx-auto lg:w-[40%] group rounded-tl-[20%] rounded-bl-[20%] rounded-br-[20%] overflow-hidden">
              <img
                className="w-full h-full object-cover transition-all duration-[0.5s] group-hover:scale-[1.1]"
                src={
                  Object.keys(aboutData).length1 !== 0 &&
                  aboutData.groupphotosecond
                }
                alt="AboutUs"
              />
            </div>
            {/* who we are right content */}
            <div className="w-[80%] mx-auto lg:w-[50%] flex flex-col gap-6">
              <p className="text-[1rem] text-lightText">
                {Object.keys(aboutData).length1 !== 0 && aboutData.description}
              </p>
            </div>
          </div>
        </div>

        {/* team section */}

        <TeamSlider />

        {/* Get started Project */}
        <AboutGetStarted
          img={Object.keys(aboutData).length1 !== 0 && aboutData.bgimage}
        />
      </div>
      <Footer />
    </CommonLayout>
  );
};

export default AboutUs;
