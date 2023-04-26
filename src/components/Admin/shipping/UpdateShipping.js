import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createShippingCostAPI,
  updateShippingCostAPI,
} from "../../../api/shippingApi";
import { shippingCostVlidateForm } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";
const UpdateShipping = () => {
  const [loading, setLoading] = useState(false);
  const { state: data } = useLocation();
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
  useEffect(() => {
    setState({ ...data });
  }, []);
  const handleUpdate = async () => {
    const isOk = shippingCostVlidateForm(state);
    if (isOk) {
      setLoading(true);
      const res = await updateShippingCostAPI(data._id, state, setLoading); // api call
      if (res && res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        setState({
          insideDhaka: "",
          outsideDhaka: "",
          bkashNo: "",
          nagadNo: "",
          rocketNo: "",
        });
        navigate("/admin/allshipping");
      }
    }
  };
  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Update Shipping Cost
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex flex-wrap gap-x-4 gap-y-4">
          <div className="w-full md:w-[45%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Inside Dhaka <span className="text-red-600">*</span>
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
          <div className="w-full md:w-[45%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Outside Dhaka <span className="text-red-600">*</span>
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
          <div className="w-full md:w-[45%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Bkash Phone No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="bkashNo"
              onChange={handleInput}
              value={state.bkashNo}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[45%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Nagad Phone No <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="nagadNo"
              onChange={handleInput}
              value={state.nagadNo}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[45%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Rocket Phone No <span className="text-red-600">*</span>
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
        <div className="w-full flex gap-x-4 items-center">
          {loading ? (
            <button
              disabled={loading ? true : false}
              className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
            >
              Loading <PulseLoader size={8} color="#2c3e50" />
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateShipping;
