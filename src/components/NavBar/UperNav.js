import React from "react";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { TfiYoutube, TfiFacebook } from "react-icons/tfi";
import { Link } from "react-router-dom";
const UperNav = () => {
  return (
    <div
      className="bg-white flex  items-center justify-center gap-3 md:justify-between
     flex-wrap  py-3 md:py-2  px-4 text-secondary shadow-md"
    >
      <div className=" flex items-center gap-2 px-3">
        <CiMail className=" text-2xl " />
        <p>info@krishanbazar.com</p>
      </div>

      <div className=" flex items-center gap-4 px-6 text-xl ">
        <a href="https://www.youtube.com/channel/UC79YkYmqj6QMP8ihNJ7VraA" target="_blank">
          <TfiYoutube />
        </a>
        <a href="https://www.instagram.com/invites/contact/?i=19bn2ph92vi21&utm_content=qbdv73e" target="_blank">
          <BsInstagram />
        </a>
        <a href="https://www.facebook.com/krishanbazar18/" target="_blank">
          <TfiFacebook />
        </a>
        <a href="/" target="_blank">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default UperNav;
