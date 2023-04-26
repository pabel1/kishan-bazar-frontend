import React, { useContext, useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUserAPI } from "../../../api/userApi";
import avatar_placeholder from "../../../assets/images/avatar_placeholder.png";
import { UserContext } from "../../../context";
import { validateUserUpdate } from "../../../validation/FormValidation";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [base64, setBase64] = useState("");
  const { userState } = useContext(UserContext);
  const [file, setFile] = useState("");
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: avatar_placeholder,
  });

  useEffect(() => {
    setState({
      name: userState?.user?.name,
      email: userState?.user?.email,
      phone: userState?.user?.phone,
      avatar: userState?.user?.avatarurl || userState?.user?.avatar?.url,
    });
    const convertedBase64Imge = async () => {
      const response = await fetch(userState?.user?.avatar?.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(blob);
    };
    convertedBase64Imge();
  }, []);

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

  const handleUpdate = async () => {
    const isValid = validateUserUpdate(state);
    if (isValid) {
      const res = await updateUserAPI(state, base64); //api call
      if (res && res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-4 px-8 py-4 rounded-xl bg-white">
      <div className="w-full flex gap-x-4">
        <div className="w-[50%]">
          <label className="text-[1rem] font-medium" htmlFor="">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            value={state.name}
            className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          />
        </div>
        <div className="w-[50%]">
          <label className="text-[1rem] font-medium" htmlFor="">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            onChange={handleInput}
            value={state.email}
            className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          />
        </div>
        <div className="w-[50%]">
          <label className="text-[1rem] font-medium" htmlFor="">
            Phone <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="phone"
            onChange={handleInput}
            value={state.phone}
            className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          />
        </div>
      </div>
      {/* for file */}
      <div className="w-full flex gap-x-4">
        <div
          className="px-4 py-3 w-[50%] border border-gray-300 text-gray-900 
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
              src={state.avatar}
              alt="avatar"
            />
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center">
          <button
            onClick={handleUpdate}
            className="px-4 py-3 text-bgColor bg-primaryColor flex justify-center items-center rounded-xl"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
