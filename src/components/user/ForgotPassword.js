import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmailAPI } from "../../api/userApi";
import { validateForgetForm } from "../../validation/FormValidation";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPopUp, setShowPopUp] = useState(true);

  const sendEmail = async (e) => {
    e.preventDefault();
    const isValid = validateForgetForm(email);
    if (isValid) {
      const res = await sendEmailAPI(email);
      if (res && res.status === 200) {
        toast.success(`Email send to ${email} successfully`);
        navigate("/login");
      }
    }
  };
  return (
    <div
      className={`${
        showPopUp ? "flex" : "hidden"
      } w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)] z-[5000] fixed`}
    >
      <div className="relative container w-[90%] md:w-[60%] py-[10%]   rounded-lg bg-bgColor flex items-center">
        <form className="w-full h-full flex flex-col gap-y-4 justify-center items-center object-cover">
          <h1 className="text-center text-[1rem] text-secondary font-semibold">
            Send Email To Reset Password
          </h1>
          <div className="w-[60%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div>
            <button
              onClick={sendEmail}
              className="px-[0.8rem] py-[0.5rem] border border-primaryColor  text-primbg-primaryColor rounded-xl transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor"
            >
              Send
            </button>
          </div>
        </form>

        <AiOutlineClose
          size={30}
          className="absolute top-4 right-4 text-primaryColor cursor-pointer"
          onClick={() => {
            setShowPopUp(false);
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
