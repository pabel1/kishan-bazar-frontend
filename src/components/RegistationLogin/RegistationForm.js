import React, { useState } from "react";
import Input from "./Input";
import signup from "../../assets/images/signup.svg";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BsImage, BsEnvelope, BsEyeSlash, BsPhone } from "react-icons/bs";
import { signUpAPI } from "../../api/userApi";
import { signupFormValidation } from "../../validation/FormValidation";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../context";
import { setToken } from "../../localstorage";

const RegistationForm = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(UserContext);
  const [file, setFile] = useState("");
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  // Converting normal file to base64string
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setState({ ...state, avatar: reader.result });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };

  convertToBase64(file);
  const handleSignUp = async (e) => {
    e.preventDefault();
    const isValid = signupFormValidation(state);
    if (isValid) {
      const res = await signUpAPI(state);
      if (res && res.status === 201) {
        setUserState({ ...userState, user: res.data.user, isLogin: true });
        setToken(res?.data?.token);
        toast.success(res.data.message);
        setState({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          avatar: avatar_placeholder,
        });
        navigate("/");
      }
    }
  };
  return (
    <div className=" container w-full lg:w-[90%] mx-auto py-5 bg-bgColor flex flex-col lg:flex-row gap-6 justify-between items-center">
      <div className="w-full md:w-[80%] lg:w-[45%] flex gap-6 flex-col items-center">
        <h2 className="text-[2rem] font-semibold text-primaryColor">Sign Up</h2>
        <img
          className="w-full h-full object-contain object-center animate-pulse"
          src={signup}
          alt="SignUp"
        />
      </div>
      <div className="w-full md:w-[80%] lg:w-[55%] flex flex-col gap-4 justify-center">
        <Input
          type="text"
          name="name"
          value={state.name}
          onChange={handleInput}
          placeholder="Name"
          Icon={AiOutlineUser}
        />
        <Input
          type="email"
          name="email"
          value={state.email}
          onChange={handleInput}
          placeholder="Email"
          Icon={BsEnvelope}
        />
        <Input
          type="text"
          name="phone"
          value={state.phone}
          onChange={handleInput}
          placeholder="Phone No"
          Icon={BsPhone}
        />
        <Input
          type="password"
          name="password"
          value={state.password}
          onChange={handleInput}
          placeholder="Password"
          Icon={BsEyeSlash}
        />
        <Input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleInput}
          placeholder="Confirm Password"
          Icon={BsEyeSlash}
        />

        {/* for file */}
        <div
          className="px-4 py-3 w-full border border-gray-300 text-gray-900 
  placeholder-transparent rounded-lg 
   placeholder:text-3xl flex items-center justify-between"
        >
          <label
            className="w-[50%] md:w-[60%] border border-primaryColor text-center py-1 rounded-lg"
            htmlFor="avatar"
          >
            Choose Avatar
            <BsImage className="inline-block ml-1 text-primaryColor" />
          </label>
          <input
            className="hidden"
            onChange={handleFile}
            type="file"
            name="avatar"
            id="avatar"
          />
          <div className="w-[20%]">
            <img
              className="w-12 h-w-12 rounded-full object-contain"
              src={state.avatar || avatar_placeholder}
              alt="avatar"
            />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={handleSignUp}
            className=" mx-auto px-4 py-[0.5rem] border border-primaryColor  text-primbg-primaryColor rounded-full transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor"
          >
            SignUp
          </button>
          <h6 className="text-textColor font-medium text-[1rem] whitespace-pre flex flex-wrap">
            Already Signup?
            <Link to={"/login"} className="text-primaryColor font-medium ml-1">
              Log In.
            </Link>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default RegistationForm;
