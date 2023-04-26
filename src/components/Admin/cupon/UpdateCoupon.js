import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateCouponAPI } from "../../../api/couponApi";
import { couponVlidateForm } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";

const UpdateCoupon = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    code: "",
    discountPercent: "",
    discountType: "",
    validationDate: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setState({ ...location.state });
  }, []);

  const handleUpdate = async () => {
    const isOk = couponVlidateForm(state);
    if (isOk) {
      setLoading(true);
      const res = await updateCouponAPI(location.state._id, state, setLoading); // api call
      if (res && res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/admin/allcopons");
        setState({
          name: "",
          code: "",
          discountPercent: "",
          discountType: "%",
          validationDate: "",
        });
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Update Coupon
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Cupon Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleInput}
              value={state.name}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Cupon Validation Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              name="validationDate"
              onChange={handleInput}
              value={state.validationDate}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Coupon Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="code"
              onChange={handleInput}
              value={state.code}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[50%] flex gap-x-2 items-center">
            <div className="w-full">
              <label className="text-[1rem] font-medium" htmlFor="">
                Coupon Discount <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="discountPercent"
                onChange={handleInput}
                value={state.discountPercent}
                className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
              />
            </div>
            <div className="w-[100px] pt-6">
              <select
                className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
                name="discountType"
                value={state.discountType}
                onChange={handleInput}
              >
                <option value={"%"}>%</option>
                <option value={"Tk"}>Tk</option>
              </select>
            </div>
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

export default UpdateCoupon;
