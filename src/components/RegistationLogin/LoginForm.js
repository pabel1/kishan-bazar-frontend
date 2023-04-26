import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import signup from "../../assets/images/signup.svg";
import { FcGoogle } from "react-icons/fc";
import { BsEnvelope, BsEyeSlash, BsFacebook } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, signUpAPI } from "../../api/userApi";
import { loginFormValidate } from "../../validation/FormValidation";
import { facebookProvider, googleProvider } from "../../firebase/Firebase";
import avatar_placeholder from "../../assets/images/avatar_placeholder.png";
import { auth } from "../../firebase/Firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { toast } from "react-toastify";
import { UserContext } from "../../context";
import { setToken } from "../../localstorage";

const LoginForm = () => {
  const navigate = useNavigate();
  const { userState, setUserState } = useContext(UserContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const isOK = loginFormValidate(state);
    if (isOK) {
      const res = await loginAPI(state); // api call
      if (res && res.status === 200) {
        toast.success(res.data.message);
        setUserState({ ...userState, user: res.data.user, isLogin: true });
        setToken(res?.data?.token);
        setState({ email: "", password: "" });
        navigate("/");
      }
    }
  };

  const handleSignUpWithGoogle = async (e) => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const res = await signUpAPI({
        name: user.displayName,
        email: user.email,
        password: user.uid,
        confirmPassword: user.uid,
        avatar: user?.photoURL,
        firebase: true,
      });
      if ((res && res.status === 201) || res.status === 200) {
        toast.success(res.data.message);
        setUserState({ ...userState, user: res.data.user, isLogin: true });
        setToken(res?.data?.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUpWithFacebook = async (e) => {
    try {
      const { user } = await signInWithPopup(auth, facebookProvider);
      const res = await signUpAPI({
        name: user.displayName,
        email: user.email,
        password: user.uid,
        confirmPassword: user.uid,
        avatar: user.photoURL,
        firebase: true,
      });
      if (res && res.status === 201) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userState.user);
  return (
    <div className=" py-5 container w-full lg:w-[90%] mx-auto  bg-bgColor flex flex-col lg:flex-row gap-6 justify-between items-center">
      <div className="w-full md:w-[80%] lg:w-[45%] flex gap-6 flex-col items-center">
        <h2 className="text-[2rem] font-semibold text-primaryColor">Login</h2>
        <img
          className="w-full h-full object-contain object-center animate-pulse"
          src={signup}
          alt="SignUp"
        />
      </div>
      <div className="w-full md:w-[80%] lg:w-[55%] flex flex-col gap-4 justify-center">
        <Input
          type="email"
          name="email"
          value={state.email}
          onChange={handleInput}
          placeholder="Email"
          Icon={BsEnvelope}
        />
        <Input
          type="password"
          name="password"
          value={state.password}
          onChange={handleInput}
          placeholder="Password"
          Icon={BsEyeSlash}
        />

        <div className="flex gap-4 justify-between items-center">
          <button
            onClick={handleLogin}
            className="  py-2 px-4 border border-primaryColor  text-primbg-primaryColor rounded-full transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor"
          >
            Login
          </button>
          <h6 className="text-textColor font-medium flex  whitespace-pre flex-wrap text-[1rem]">
            New Here?
            <Link to={"/signup"} className="text-primaryColor font-medium ml-1">
              Sign Up.
            </Link>
          </h6>
        </div>
        {/* forgot password */}
        <h6 className="font-semibold text-[0.9rem] text-primaryColor">
          <Link to={"/forgotPassword"}>Forgot password</Link>
        </h6>
        {/* login with google and facebook */}
        <div className="flex items-center">
          <h6 className="font-semibold text-[0.9rem] text-textColor">
            <Link to={"/forgotPassword"}>Login With</Link>
          </h6>

          <FcGoogle
            onClick={handleSignUpWithGoogle}
            className="text-[2rem] cursor-pointer ml-6"
          />
          {/* <BsFacebook
            onClick={handleSignUpWithFacebook}
            className="text-[#1298F6] text-[2rem] cursor-pointer ml-6"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
