import React, { useEffect, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateDiscountAPI } from "../../../api/discountApi";
import product_placeholder from "../../../assets/images/product_placeholder.png";
import { discountProductFormValidate } from "../../../validation/FormValidation";
import { PulseLoader } from "react-spinners";
const UpdateDiscountProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    productId: "",
    price: "",
    productname: "",
    description: "",
    brand: "",
    stock: "",
    discountInPercent: "",
    image: "",
    category: "",
    subcategory: "",
  });
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleUpdateDiscount = async () => {
    const isOk = discountProductFormValidate(state);
    if (isOk) {
      setLoading(true);
      const res = await updateDiscountAPI(
        state,
        location.state._id,
        setLoading
      ); // api call
      if (res && res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
        navigate("/admin/alldiscountproducts");
        setState({
          productId: "",
          price: "",
          productname: "",
          description: "",
          brand: "",
          stock: "",
          discountInPercent: "",
          image: "",
          category: "",
          subcategory: "",
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
        Update Discount Product
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <div className="w-full flex justify-between gap-x-4">
          <div className="w-[50%]">
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
          <div className="w-[50%]">
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
        <div className="w-full flex justify-between gap-x-4">
          <div className="w-[50%]">
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
          <div className="w-[50%]">
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
        <div className="w-full flex justify-between gap-x-4">
          <div className="w-[50%]">
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
          <div className="w-[50%]">
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
        <div className="w-full">
          <label className="text-[1rem] font-medium" htmlFor="">
            Product Discount Percent <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="discountInPercent"
            onChange={handleInput}
            value={state.discountInPercent}
            className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          />
        </div>
        <div className="w-full">
          <label className="text-[1rem] font-medium" htmlFor="">
            Product Stock <span className="text-red-600">*</span>
          </label>
          <input
            type="number"
            name="stock"
            onChange={handleInput}
            value={state.stock}
            className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          />
        </div>
        <div className="w-full flex justify-between gap-x-4">
          <div className="w-[60%]">
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
          <div className="w-[50%]">
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
            onClick={handleUpdateDiscount}
            className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-xl transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default UpdateDiscountProduct;
