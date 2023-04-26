import React, { useState } from "react";
import { BsImage } from "react-icons/bs";
import { FaFileCsv } from "react-icons/fa";
import product_placeholder from "../../../assets/images/product_placeholder.png";
import {
  createProductAPI,
  uploadCSVProductsAPI,
} from "../../../api/productApi";
import { productFormValidate } from "../../../validation/FormValidation";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const Createproduct = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [csvfile, setCsvFile] = useState("");
  const [csvFilename, setCsvFileName] = useState("Choose Products CSV file");
  const [filename, setFileName] = useState("Choose Product Image");
  const [state, setState] = useState({
    productId: "",
    price: "",
    productname: "",
    description: "",
    brand: "",
    demoprice: "",
    image: "",
    category: "",
    subcategory: "",
    stock: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleCsvFile = (e) => {
    setCsvFile(e.target.files[0]);
    setCsvFileName(e.target.files[0].name);
  };

  const handleCreateSingleProduct = async () => {
    const isOk = productFormValidate(state);
    if (isOk) {
      setLoading(true);
      const res = await createProductAPI(state, setLoading);
      if (res && res.status === 201) {
        setLoading(false);
        toast.success(res.data.message);
      }
      setState({
        productId: "",
        price: "",
        productname: "",
        description: "",
        brand: "",
        demoprice: "",
        image: "",
        category: "",
        subcategory: "",
      });
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const sendFile = async () => {
      const formdata = new FormData();
      formdata.append("csvfile", csvfile);
      setLoading(true);
      const res = await uploadCSVProductsAPI(formdata, setLoading); // api call
      if (res && res.status === 200) {
        setLoading(false);
        setCsvFile("");
        setCsvFileName("Choose Products CSV file")
        toast.success(res.data.message);
      }
    };
    sendFile();
  };
  return (
    <div className=" my-4">
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Create Single Product
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Id <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="productId"
              onChange={handleInput}
              value={state.productId}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Price <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="price"
              onChange={handleInput}
              value={state.price}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="productname"
              onChange={handleInput}
              value={state.productname}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Brand <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="brand"
              onChange={handleInput}
              value={state.brand}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Category <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="category"
              onChange={handleInput}
              value={state.category}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product SubCategory <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="subcategory"
              onChange={handleInput}
              value={state.subcategory}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap gap-4">
          <div className="md:w-[50%] w-full">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Discount Demo Price{" "}
            </label>
            <input
              type="number"
              name="demoprice"
              onChange={handleInput}
              value={state.demoprice}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Stock
              <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              name="stock"
              min={1}
              onChange={handleInput}
              value={state.stock}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            />
          </div>
        </div>
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap gap-4">
          <div className="w-full md:w-[50%]">
            <label className="text-[1rem] font-medium" htmlFor="">
              Product Description
            </label>
            <textarea
              rows={7}
              name="description"
              onChange={handleInput}
              value={state.description}
              className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
            ></textarea>
          </div>
          <div className="w-full md:w-[50%] flex flex-col gap-y-8">
            <div>
              <label className="text-[1rem] font-medium" htmlFor="">
                Product Image Url <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="image"
                onChange={handleInput}
                value={state.image}
                className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
              />
            </div>
            {loading ? (
              <button
                disabled={loading ? true : false}
                className="flex items-center w-fit text-secondary  px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
              >
                Loading <PulseLoader size={8} color="#2c3e50" />
              </button>
            ) : (
              <button
                onClick={handleCreateSingleProduct}
                className="flex items-center w-fit text-secondary  px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
      <h2 className="my-4 text-secondary text-center md:text-left text-[1.2rem] font-semibold">
        Create Products Using CSV file
      </h2>
      <div className=" w-full flex flex-col md:flex-row justify-start items-center gap-6">
        <div className=" flex gap-x-4">
          <label
            htmlFor="csvfile"
            className=" w-full md:w-fit flex whitespace-pre justify-center items-center outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          >
            {csvFilename}
            <FaFileCsv size={40} className="text-secondary" />
            <span className="text-red-500 text-lg">*</span>
          </label>
          <input
            type="file"
            id="csvfile"
            name="csvfile"
            required
            className="hidden"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleCsvFile}
          />
        </div>
        {loading ? (
          <button
            disabled={loading ? true : false}
            className="w-fit flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-full whitespace-nowrap transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Loading <PulseLoader size={8} color="#2c3e50" />
          </button>
        ) : (
          <button
            onClick={handleUpload}
            className="w-fit flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-full whitespace-nowrap transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Upload Products CSV
          </button>
        )}
      </div>
    </div>
  );
};

export default Createproduct;
