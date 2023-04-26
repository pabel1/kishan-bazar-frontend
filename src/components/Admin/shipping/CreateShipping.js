import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCounponAPI } from "../../../api/couponApi";
import { createShippingCostAPI } from "../../../api/shippingApi";
import { shippingCostVlidateForm } from "../../../validation/FormValidation";
import {PulseLoader} from "react-spinners"

const CreateShipping = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({
    insideDhaka: "",
    outsideDhaka: "",
    bkashNo: "",
    nagadNo: "",
    rocketNo: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleCreatShipping = async () => {
    const isOk = shippingCostVlidateForm(state);
    if (isOk) {
      setLoading(true);
      const res = await createShippingCostAPI(state, setLoading); // api call
      if (res && res.status === 201) {
        setLoading(false);
        toast.success(res.data.message);
        setState({
          insideDhaka: "",
          outsideDhaka: "",
          bkashNo: "",
          nagadNo: "",
          rocketNo: "",
        });
        navigate("/admin");
      }
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Create Shipping Cost
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-x-4">
          <div className="w-[80%] mx-auto md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Inside Dhaka Cost<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="insideDhaka"
              min={0}
              onChange={handleInput}
              value={state.insideDhaka}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-[80%] mx-auto md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Outside Dhaka Cost<span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="outsideDhaka"
              min={0}
              onChange={handleInput}
              value={state.outsideDhaka}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-x-4">
          <div className="w-[80%] mx-auto md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Bkash No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="bkashNo"
              onChange={handleInput}
              value={state.bkashNo}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-[80%] mx-auto md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Nagad No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="nagadNo"
              onChange={handleInput}
              value={state.nagadNo}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-y-4 md:gap-x-4">
          <div className="w-[80%] mx-auto md:mx-0 md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Rocket No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="rocketNo"
              onChange={handleInput}
              value={state.rocketNo}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-[80%] mx-auto md:mx-0 flex gap-y-4 md:gap-x-4 items-center">
          {loading ? (
            <button
              disabled={loading ? true : false}
              className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
            >
              Loading <PulseLoader size={8} color="#2c3e50" />
            </button>
          ) : (
            <button
              onClick={handleCreatShipping}
              className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShipping;
