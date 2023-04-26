import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { BsEnvelope } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

import FrequentlyAsked from "../components/FAQ/FrequentlyAsked";
import CommonLayout from "./CommonLayout";
import Footer from "../components/Footer/Footer";
const ContactUs = () => {
  return (
    <>
      <CommonLayout>
        <div className="w-full mt-10">
          <h1 className="text-secondary font-semibold text-[1.8rem] text-center">
            Get In Touch
          </h1>
          {/* contact details */}
          <div className="w-[80%] mt-8 px-6 py-10 bg-[#e0e0e0] rounded-t-xl mx-auto flex flex-col md:flex-row justify-evenly gap-4">
            <div className="w-full lg:w-[16rem] py-6 px-4 bg-white rounded-xl flex flex-col gap-2 items-center group">
              <div className="w-16 h-16 flex justify-center items-center rounded-full bg-primaryColor transition-all duration-[0.3s] group-hover:scale-[1.1]">
                <FiPhoneCall className="text-[1.6rem] text-white" />
              </div>
              <h6 className="text-lightText text-[1rem] md:text-[0.8rem] lg:text-[1rem]">
                +880 1745-577488
              </h6>
            </div>

            <div className="w-full lg:w-[16rem] py-6 px-4 bg-white rounded-xl flex flex-col gap-2 items-center group">
              <div className="w-16 h-16 flex justify-center items-center rounded-full bg-primaryColor transition-all duration-[0.3s] group-hover:scale-[1.1]">
                <BsEnvelope className="text-[1.6rem] text-white" />
              </div>
              <h6 className="text-lightText text-[1rem] md:text-[0.8rem] lg:text-[1rem]">
                <a href="mailto:info@krishanbazar.com">info@krishanbazar.com</a>
              </h6>
              <h6 className="text-lightText text-[1rem] md:text-[0.8rem] lg:text-[1rem]">
                <a href="mailto:krishanagro18@gmail.com">
                  krishanagro18@gmail.com
                </a>
              </h6>
            </div>

            <div className="w-full lg:w-[16rem] py-6 px-4 bg-white rounded-xl flex flex-col gap-2 items-center group">
              <div className="w-16 h-16 flex justify-center items-center rounded-full bg-primaryColor transition-all duration-[0.3s] group-hover:scale-[1.1]">
                <GoLocation className="text-[1.6rem] text-white" />
              </div>
              <p className="text-lightText text-[1rem] text-center md:text-[0.8rem] lg:text-[1rem]">
                House - 5/1, M-2, Flat- 1C, Silicon Silver Rain, Shyamoli, Dhaka
                - 1207, Bangladesh
              </p>
            </div>
          </div>

          {/* contact form and location map */}
          <div className="w-[80%] px-6 py-10 bg-[#e0e0e0] border-t border-primaryColor rounded-b-xl mx-auto flex flex-col md:flex-row justify-between gap-4 items-center">
            <div className="w-full md:w-[50%] flex flex-col justify-center items-start gap-6">
              <input
                type="text"
                className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl"
                placeholder="Name"
              />
              <input
                type="text"
                className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl"
                placeholder="Email"
              />
              <textarea
                rows={5}
                className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl"
                placeholder="Message"
              ></textarea>
              <button className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-full transition-all duration-[0.3s] hover:text-white hover:bg-secondary">
                Send
              </button>
            </div>
            <div className="w-full md:w-[50%] h-[22rem] p-4">
              <iframe
                className="rounded-xl"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1773347801145!2d90.35806541429747!3d23.776698693689596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c149d39d706f%3A0x2e6c5c0845b8aebf!2sSilicon%20Silver%20Rain!5e0!3m2!1sen!2sbd!4v1675837864363!5m2!1sen!2sbd"
                width="100%"
                height="100%"
              ></iframe>
            </div>
          </div>
        </div>
        <FrequentlyAsked />
        <Footer />
      </CommonLayout>
    </>
  );
};

export default ContactUs;
