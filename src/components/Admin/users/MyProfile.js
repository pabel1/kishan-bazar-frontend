import React, { useContext, useEffect, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyOrdersAPI } from "../../../api/orderApi";
import { updatePasswordAPI } from "../../../api/userApi";
import { UserContext } from "../../../context";
import { CgLastpass } from "react-icons/cg";
import { updatePasswordFormValidation } from "../../../validation/FormValidation";
import MyOrders from "./MyOrders";
import UpdateProfile from "./UpdateProfile";
import CommonLayout from "../../../Pages/CommonLayout";
const MyProfile = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [myOrders, setMyOrders] = useState([]);
  const { userState, setUserState } = useContext(UserContext);
  const [chageProfile, setChangeProfile] = useState(1);
  const toggleTab = (index) => {
    setChangeProfile(index);
  };

  useEffect(() => {
    const getMyOrders = async () => {
      const res = await getMyOrdersAPI(); // api call
      if (res && res.status === 200) {
        setMyOrders([...res.data.orders]);
      }
    };
    getMyOrders();
  }, []);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const updatePassword = async (e) => {
    const isValid = updatePasswordFormValidation(state);
    if (isValid) {
      const res = await updatePasswordAPI(state); //api call
      if (res && res.status === 200) {
        toast.success(res.data.message);
        navigate("/");
      }
    }
  };
  return (
    <CommonLayout>
      <div className=" container  mx-auto rounded-xl bg-[#f7f5f3] mt-7 p-[2rem]">
        <h2 className="text-primaryColor font-semibold text-[1.2rem] text-left mb-4">
          User Dashboard
        </h2>
        {/* profile tabs */}
        <div className=" w-full md:w-[70%]  flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => toggleTab(1)}
            className=" whitespace-pre px-4 py-1 text-primaryColor border border-primaryColor flex justify-center items-center rounded-xl"
          >
            <ImProfile size={20} /> My Profile
          </button>
          <button
            onClick={() => toggleTab(2)}
            className="whitespace-pre px-4 py-1 text-primaryColor border border-primaryColor flex justify-center items-center rounded-xl"
          >
            <AiOutlineUnorderedList size={20} /> My Orders
          </button>
          <button
            onClick={() => toggleTab(3)}
            className="whitespace-pre px-4 py-1 text-primaryColor border border-primaryColor flex justify-center items-center rounded-xl"
          >
            <FaUserEdit size={20} /> Edit Profile
          </button>
          <button
            onClick={() => toggleTab(4)}
            className="whitespace-pre px-4 py-1 text-primaryColor border border-primaryColor flex justify-center items-center rounded-xl"
          >
            <CgLastpass size={20} /> Update Password
          </button>
        </div>

        {/* profile tab content (myprofile)*/}
        <div
          className={`${
            chageProfile === 1 ? "block" : "hidden"
          } flex flex-col gap-4 mt-4`}
        >
          <div
            className="container  w-full h-[65vh] flex flex-wrap-reverse md:flex-nowrap
           gap-2 px-8  rounded-xl bg-white"
          >
            <div className="w-full md:w-[60%] flex flex-col gap-y-4 justify-center items-start">
              <h3 className="text-[1rem] font-semibold">
                Name-{" "}
                <span className="font-medium text-secondary">
                  {userState.user.name}
                </span>{" "}
              </h3>
              <h3 className="text-[1rem] font-semibold">
                Email-{" "}
                <span className="font-medium text-secondary">
                  {userState.user.email}
                </span>{" "}
              </h3>
              {userState.user.phone && (
                <h3 className="text-[1rem] font-semibold">
                  Phone-{" "}
                  <span className="font-medium text-secondary">
                    {userState.user.phone}
                  </span>{" "}
                </h3>
              )}
              <h3 className="text-[1rem] font-semibold">
                Joined At-{" "}
                <span className="font-medium text-secondary">
                  {new Date(userState.user.createdAt).toLocaleDateString()}
                </span>{" "}
              </h3>
              <h3 className="text-[1rem] font-semibold">
                Role-{" "}
                <span className="font-medium text-secondary">
                  {userState.user.userRole}
                </span>{" "}
              </h3>
            </div>
            <div className="container pt-4 w-full md:w-[40%] flex gap-2 justify-center items-center">
              <img
                className=" w-32 h-32 sm:w-44 sm:h-44 object-cover rounded-full transition-all duration-[0.3s] hover:scale-[1.1]"
                src={
                  userState?.user?.avatarurl || userState?.user?.avatar?.url
                }
                alt=""
              />
            </div>
          </div>
        </div>
        {/* profile tab content (myorders)*/}

        <div
          className={`${
            chageProfile === 2 ? "block" : "hidden"
          } flex flex-col gap-4 mt-4`}
        >
          <div className="flex flex-col justify-between px-8 py-4 rounded-xl bg-white">
            <div className="flex gap-2 justify-start items-center">
              <MyOrders myOrders={myOrders} />
            </div>
          </div>
        </div>

        {/* profile tab content (editprofile)*/}
        <div
          className={`${
            chageProfile === 3 ? "block" : "hidden"
          } flex flex-col gap-4 mt-4`}
        >
          <UpdateProfile />
        </div>

        {/* profile tab content (update password)*/}
        <div
          className={`${
            chageProfile === 4 ? "block" : "hidden"
          } flex flex-col gap-4 mt-4`}
        >
          <div className="w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Old Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="oldPassword"
              onChange={handleInput}
              value={state.oldPassword}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              New Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="newPassword"
              onChange={handleInput}
              value={state.newPassword}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleInput}
              value={state.confirmPassword}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-[50%] flex justify-center items-center">
            <button
              onClick={updatePassword}
              className="px-4 py-3 text-bgColor bg-primaryColor flex justify-center items-center rounded-xl"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default MyProfile;
