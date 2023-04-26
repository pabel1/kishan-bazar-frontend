import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsInstagram, BsFillTelephoneFill } from "react-icons/bs";

import { TfiYoutube, TfiFacebook } from "react-icons/tfi";

import { CiMail } from "react-icons/ci";

import paymentImg from "../../assets/images/bkash-nagad-rocket-1.png";
import logo from "../../assets/images/KrishanLogo.png";

const BottomFooter = () => {
  return (
    <div className="my-8 flex flex-col justify-center items-center ">
      {/* number and email for footer */}
      <div className="w-full flex items-center  gap-5">
        <hr className=" w-[40%] border-secondary font-bold border" />
        <div className=" my-3 flex gap-2 text-secondary">
          <div className=" flex items-center gap-2 px-3 py-3">
            <CiMail className=" text-2xl " />
            <p>info@krishanbazar.com</p>
          </div>
        </div>
        <hr className=" w-[40%] border-secondary font-bold border" />
      </div>

      {/* address and  copyRight for footer  */}

      <div className=" space-y-4 flex flex-col items-center justify-center text-center ">
        <p className=" text-sm text-lightText">
          House - 5/1, M-2, Flat- 1C, Silicon Silver Rain, Shyamoli, Dhaka -
          1207, Bangladesh
        </p>
        <img className="  w-[130px]" src={paymentImg} alt="" />
        <hr className=" border" />
        <p className=" text-sm text-lightText my-2 ">
          Copyright <span className=" text-secondary">©</span>{" "}
          {new Date().getFullYear()} Krishan-Bazar all rights reserved.
        </p>
      </div>
    </div>
  );
};

export default BottomFooter;
