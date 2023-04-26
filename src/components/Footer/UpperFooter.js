import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/images/KrishanLogo.png";

const UpperFooter = () => {
  return (
    <div className="container w-full  grid grid-cols-1 md:flex items-center justify-around md:justify-center gap-10">
      <div className="flex flex-col gap-y-4 mx-auto md:mx-0">
        <div>
          <img src={logo} className="w-36 object-cover" alt="" />
        </div>
        <div className="flex gap-x-4">
          <a
            className="w-10 h-10 rounded-full flex justify-center items-center text-secondary shadow-lg shadow-setext-secondary p-2"
            href="https://www.facebook.com/krishanbazar18/"
            target="_blank"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            className="w-10 h-10 rounded-full flex justify-center items-center text-secondary shadow-lg shadow-setext-secondary p-2"
            href="/"
            target="_blank"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            className="w-10 h-10 rounded-full flex justify-center items-center text-secondary shadow-lg shadow-setext-secondary p-2"
            href="https://www.youtube.com/channel/UC79YkYmqj6QMP8ihNJ7VraA"
            target="_blank"
          >
            <FaYoutube size={20} />
          </a>
          <a
            className="w-10 h-10 rounded-full flex justify-center items-center text-secondary shadow-lg shadow-setext-secondary p-2"
            href="https://www.instagram.com/invites/contact/?i=19bn2ph92vi21&utm_content=qbdv73e"
            target="_blank"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
      <div className=" flex gap-x-10 mx-auto md:mx-0">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-[1.2rem] font-medium text-secondary">
            Usefull Links
          </h1>
          <Link
            className="text-[1rem] font-normal text-lightText"
            to="/support"
          >
            {" "}
            Help & Support
          </Link>
          <Link
            className="text-[1rem] font-normal text-lightText"
            to="/contactus"
          >
            {" "}
            FAQ
          </Link>
          <Link
            className="text-[1rem] font-normal text-lightText"
            to="/contactus"
          >
            {" "}
            Contact Us
          </Link>
          <Link
            className="text-[1rem] font-normal text-lightText"
            to="/aboutus"
          >
            {" "}
            About Us
          </Link>
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-[1.2rem] font-medium text-secondary">
            Information
          </h1>
          <Link className="text-[1rem] font-normal text-lightText" to="/terms">
            Terms & Conditions
          </Link>
          <Link
            className="text-[1rem] font-normal text-lightText"
            to="/privacy"
          >
            Privacy Policy
          </Link>
          <Link className="text-[1rem] font-normal text-lightText" to="/refund">
            Refund Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpperFooter;
