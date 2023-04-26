import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { createCampaignAPI } from "../../../api/campaignApi";
import product_placeholder from "../../../assets/images/product_placeholder.png";
import { campaignFormValidate } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";

const Createcampaign = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [state, setState] = useState({
    campaignname: " ",
    validationDate: "",
    discountPriceInTk: "",
    discount: "",
    image: product_placeholder,
    category: "",
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
        setState({ ...state, image: reader.result });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };
  convertToBase64(file);

  const handleCreateCampaign = async () => {
    const isOk = campaignFormValidate(state);
    if (isOk) {
      setLoading(true);
      const res = await createCampaignAPI(state, setLoading); // api call
      if (res && res.status === 201) {
        setLoading(false);
        toast.success(res.data.message);
        setState({
          campaignname: " ",
          validationDate: "",
          discountPriceInTk: "",
          discount: "",
          image: product_placeholder,
          category: "",
        });
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Create Campaign
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Campaign Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="campaignname"
              onChange={handleInput}
              value={state.campaignname}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Campaign Validation Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validationDate"
              onChange={handleInput}
              value={state.validationDate}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Campaign Category <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="category"
              onChange={handleInput}
              value={state.category}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>

          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Campaign Discount Percent <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="discount"
              onChange={handleInput}
              value={state.discount}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Campaign Discount In Tk <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="discountPriceInTk"
              onChange={handleInput}
              value={state.discountPriceInTk}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[50%] flex items-center gap-x-2 mt-5">
            <div className="w-full">
              <label
                htmlFor="image"
                className="w-full h-full flex justify-center items-center outline-none px-[0.8rem] py-[0.5rem] gap-x-4 rounded-xl border border-secondary"
              >
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFile}
                  className="hidden"
                  placeholder="Product Image"
                />
                Choose Campaign Image
                <BsImage size={20} className="text-secondary" />
              </label>
            </div>
            <div className="w-10 h-10 ">
              <img
                className="w-full h-full object-cover rounded-full"
                src={state.image}
                alt="Product"
              />
            </div>
          </div>
        </div>
        {loading ? (
          <button
            disabled={loading ? true : false}
            className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Loading <PulseLoader size={8} color="#2c3e50" />
          </button>
        ) : (
          <button
            onClick={handleCreateCampaign}
            className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default Createcampaign;
