import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateClientAPI } from "../../../api/clientApi";
import { clientFormValidate } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";

const Updateclient = () => {
  const [loading, setLoading] = useState(false);
  const [base64, setBase64] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [state, setState] = useState({
    name: "",
    designation: "",
    description: "",
    image: "",
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

  const handleUpdate = async () => {
    const isOk = clientFormValidate(state);
    if (isOk) {
      setLoading(true);
      const res = await updateClientAPI(
        state,
        base64,
        location.state._id,
        setLoading
      );
      if (res && res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        setState({
          name: "",
          designation: "",
          description: "",
          image: "",
        });
        navigate("/admin/allclients");
      }
    }
  };

  useEffect(() => {
    setState({
      name: location?.state?.name,
      designation: location?.state?.designation,
      description: location?.state?.description,
      image: location?.state?.image?.url,
    });
    const convertedBase64Imge = async () => {
      const response = await fetch(location?.state?.image?.url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(blob);
    };
    convertedBase64Imge();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Update Client
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Client Name <span className="text-red-600">*</span>
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
              Client Designation <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleInput}
              value={state.designation}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Client Says <span className="text-red-600">*</span>
            </label>
            <textarea
              type="text"
              rows={4}
              name="description"
              onChange={handleInput}
              value={state.description}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            ></textarea>
          </div>
          <div className="w-full md:w-[50%] h-fit flex items-center justify-between gap-x-4 mt-2 md:mt-5">
            <label
              className="w-[90%] border border-secondary text-center py-1 rounded-lg"
              htmlFor="image"
            >
              Choose Avatar{" "}
              <BsImage className="inline-block ml-1 text-secondary" />
            </label>
            <input
              className="hidden"
              onChange={handleFile}
              type="file"
              name="image"
              id="image"
            />
            <div className="w-[10%]">
              <img
                className="w-12 h-w-12 rounded-full object-contain"
                src={state.image}
                alt="Client"
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
            onClick={handleUpdate}
            className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default Updateclient;
