import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { toast } from "react-toastify";
import { createAboutAPI } from "../../../api/aboutApi";
import avatar_placeholder from "../../../assets/images/avatar_placeholder.png";
import { aboutFormValidate } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";

const CreateAbout = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState("");
  const [state, setState] = useState({
    title: "",
    subHeader: "",
    groupphoto: avatar_placeholder,
    groupphotosecond: avatar_placeholder,
    description: "",
    bgimage: avatar_placeholder,
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleFile = (e, name) => {
    setFile(e.target.files[0]);
    setFileName(name);
  };

  // Converting normal file to base64string
  const convertToBase64 = (file, filename) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setState({ ...state, [filename]: reader.result });
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };
  convertToBase64(file, filename);

  const handleCreateAbout = async () => {
    const isOk = aboutFormValidate(state);
    if (isOk) {
      setLoading(true);
      const res = await createAboutAPI(state, setLoading); //api call
      if (res && res.status === 201) {
        setLoading(false);
        toast.success(res.data.message);
        setState({
          title: "",
          subHeader: "",
          groupphoto: avatar_placeholder,
          groupphotosecond: avatar_placeholder,
          description: "",
          bgimage: avatar_placeholder,
        });
      }
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Create About
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              onChange={handleInput}
              value={state.title}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Sub Header <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="subHeader"
              onChange={handleInput}
              value={state.subHeader}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full">
          <label className="text-[1rem] font-medium" htmlFor="">
            About Description <span className="text-red-600">*</span>
          </label>
          <textarea
            type="text"
            name="description"
            rows={5}
            onChange={handleInput}
            value={state.description}
            className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          ></textarea>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full h-52 flex flex-col">
            <div className="w-full h-[80%]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={state.groupphoto}
                alt="Product"
              />
            </div>
            <div className="w-full h-[20%]">
              <label
                htmlFor="groupphoto"
                className="w-full h-full flex justify-center items-center outline-none px-[0.8rem] py-[0.5rem] gap-x-4 rounded-xl border border-secondary"
              >
                <input
                  type="file"
                  name="groupphoto"
                  id="groupphoto"
                  onChange={(e) => handleFile(e, "groupphoto")}
                  className="hidden"
                  placeholder="Product Image"
                />
                Group Photo
                <BsImage size={20} className="text-secondary" />
              </label>
            </div>
          </div>
          <div className="w-full h-52 flex flex-col">
            <div className="w-full h-[80%]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={state.groupphotosecond}
                alt=""
              />
            </div>
            <div className="w-full h-[20%]">
              <label
                htmlFor="groupphotosecond"
                className="w-full h-full flex justify-center items-center outline-none px-[0.8rem] py-[0.5rem] gap-x-4 rounded-xl border border-secondary"
              >
                <input
                  type="file"
                  name="groupphotosecond"
                  id="groupphotosecond"
                  onChange={(e) => handleFile(e, "groupphotosecond")}
                  className="hidden"
                />
                Second Group Photo
                <BsImage size={20} className="text-secondary" />
              </label>
            </div>
          </div>
          <div className="w-full h-52 flex flex-col">
            <div className="w-full h-[80%]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={state.bgimage}
                alt=""
              />
            </div>
            <div className="w-full h-[20%]">
              <label
                htmlFor="bgimage"
                className="w-full h-full flex justify-center items-center outline-none px-[0.8rem] py-[0.5rem] gap-x-4 rounded-xl border border-secondary"
              >
                <input
                  type="file"
                  name="bgimage"
                  id="bgimage"
                  onChange={(e) => handleFile(e, "bgimage")}
                  className="hidden"
                />
                Background Photo
                <BsImage size={20} className="text-secondary" />
              </label>
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
            onClick={handleCreateAbout}
            className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateAbout;
