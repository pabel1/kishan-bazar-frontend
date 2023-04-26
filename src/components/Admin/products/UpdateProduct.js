import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProductAPI } from "../../../api/productApi";
import product_placeholder from "../../../assets/images/product_placeholder.png";
import { productFormValidate } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";

const UpdateProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [state, setState] = useState({
    productId: "",
    price: "",
    productname: "",
    description: "",
    demoprice: "",
    brand: "",
    image: "",
    category: "",
    subcategory: "",
    stock: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const isOk = productFormValidate(state);
    if (isOk) {
      setLoading(true);
      const res = await updateProductAPI(state, location.state._id, setLoading); // api call
      if (res && res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/admin/allproducts")
        setState({
          productId: "",
          price: "",
          productname: "",
          description: "",
          demoprice: "",
          brand: "",
          image: "",
          category: "",
          subcategory: "",
          stock: "",
        });
      }
    }
  };

  //  set productdata to form
  useEffect(() => {
    setState({ ...location.state });
  }, []);
  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Update Product
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
                onClick={handleUpdate}
                className="flex items-center w-fit text-secondary  px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
              >
                Update{" "}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
