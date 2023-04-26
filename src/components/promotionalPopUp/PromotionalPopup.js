import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getAllCampaignsAPI } from "../../api/campaignApi";
import logo from "../../assets/images/KrishanLogo.png";

const PromotionalPopup = ({ showPopUp, setShowPopUp }) => {
  // const [campaignsData, setCampaignsData] = useState([]);
  const [promotionData, setPromotionData] = useState({});

  // getting all campaigns
  useEffect(() => {
    const getAllCampaigns = async () => {
      const res = await getAllCampaignsAPI(); //api call
      if (res && res.status === 200) {
        setPromotionData({
          ...res.data.campaigns[res.data.campaigns.length - 1],
        });
      }
    };
    getAllCampaigns();
  }, []);
  return (
    <div
      className={`${
        showPopUp ? "flex" : "hidden"
      } w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-[5000] fixed`}
    >
      {promotionData ? (
        <div className="relative w-[80%] sm:w-[70%] lg:w-[50%] md:h-[50%] rounded-lg bg-bgColor flex flex-col md:flex-row items-center p-8 md:p-4">
          <div className="w-full md:w-[50%] p-4 object-cover">
            <img
              src={promotionData?.image?.url}
              alt=""
              className="w-70 rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col gap-y-2">
            <h1 className="text-[1.2rem] text-textColor font-medium">
              Only Today!
            </h1>
            <h1 className="text-[3rem] text-secondary">
              {promotionData.discount}% OFF
            </h1>
            <p>Your Next Order</p>
            <Link
              className="px-2 w-[50%] text-center py-1 border-[1.8px] border-secondary rounded-full
           text-secondary hover:bg-secondary hover:text-white"
              to="/discount"
            >
              Shop Now
            </Link>
          </div>
          <AiOutlineClose
            size={30}
            className="absolute top-4 right-4 text-primaryColor cursor-pointer"
            onClick={() => setShowPopUp(false)}
          />
        </div>
      ) : (
        <div className="relative w-[50%] h-[50%] rounded-lg bg-bgColor flex items-center">
          <div className="w-[50%] object-cover">
            <img src={logo} alt="" className="w-80 object-cover" />
          </div>
          <div className="w-[50%] flex flex-col gap-y-2">
            <h1 className="text-[1rem] text-textColor font-medium animate-pulse">
              Welcome!
            </h1>
            <h1 className="text-[2rem] text-secondary"> Krishan Bazar</h1>
            <p>Find Fresh Products Here</p>
            <Link
              className="px-2 w-[50%] text-center py-1 border-[1.8px] border-secondary rounded-full
           text-secondary hover:bg-secondary hover:text-white"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
          <AiOutlineClose
            size={30}
            className="absolute top-4 right-4 text-primaryColor cursor-pointer"
            onClick={() => setShowPopUp(false)}
          />
        </div>
      )}
    </div>
  );
};

export default PromotionalPopup;
