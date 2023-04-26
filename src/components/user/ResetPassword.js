import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordAPI, sendEmailAPI } from "../../api/userApi";
import { validateResetForm } from "../../validation/FormValidation";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPopUp, setShowPopUp] = useState(true);
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    const isValid = validateResetForm(state)
    if (isValid) {
      const res = await resetPasswordAPI(state, token);
      if (res && res.status === 200) {
        toast.success(`Reset Password Successfully`);
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
      <div className="relative w-[50%] h-[50%] rounded-lg bg-bgColor flex items-center">
        <form className="w-full h-full flex flex-col gap-y-4 justify-center items-center object-cover">
          <h1 className="text-center text-[1rem] text-secondary font-semibold">
            New Password
          </h1>
          <div className="w-[60%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={handleInput}
              value={state.password}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-[60%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleInput}
              value={state.confirmPasssword}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div>
            <button
              onClick={resetPassword}
              className="px-[0.8rem] py-[0.5rem] border border-primaryColor  text-primbg-primaryColor rounded-xl transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor"
            >
              Reset Password
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

export default ResetPassword;
