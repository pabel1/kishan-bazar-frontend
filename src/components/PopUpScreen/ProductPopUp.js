import React, { useContext, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbCurrencyTaka } from "react-icons/tb";
import { AiOutlineHeart, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CartContext,
  ProductPopUpContex,
  WishListContext,
} from "../../context";
import { toast } from "react-toastify";

const ProductPopUp = () => {
  // const { state } = useLocation();
  const { productPopUpShow, setProductPopUpShow } =
    useContext(ProductPopUpContex);
  const { data: state } = productPopUpShow;
  const { cartState, setCartState } = useContext(CartContext);
  const { wishListState, setWishListState } = useContext(WishListContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartState));
  }, [cartState]);

  const addToCartHandeler = () => {
    let currentProduct = { ...state };
    currentProduct.quantity = quantity;

    const productExistInCart = cartState.find(
      (item) => item.productId === currentProduct._id
    );
    if (!productExistInCart) {
      setCartState([
        ...cartState,
        {
          productId: currentProduct._id,
          productname: currentProduct.productname,
          price: parseInt(
            currentProduct.discountPrice
              ? currentProduct.price - currentProduct.discountPrice
              : currentProduct.price
          ),
          image: currentProduct.image,
          stock: parseInt(currentProduct.stock),
          quantity: currentProduct.quantity,
        },
      ]);
      toast.success("Product added to cart successfully");
    }
  };

  const addToWishList = () => {
    let currentProduct = { ...state };
    currentProduct.quantity = quantity;
    const productExistInWishlist = wishListState.find(
      (item) => item.productId === currentProduct._id
    );

    if (!productExistInWishlist) {
      setWishListState([
        ...wishListState,
        {
          productId: currentProduct._id,
          productname: currentProduct.productname,
          price: parseInt(
            currentProduct.discountPrice
              ? currentProduct.price - currentProduct.discountPrice
              : currentProduct.price
          ),
          image: currentProduct.image,
          stock: parseInt(currentProduct.stock),
          quantity: parseInt(currentProduct.quantity),
        },
      ]);
      toast.success("Product added to wishlist successfully");
    }
  };
  const decrementQuantity = () => {
    if (quantity < 2) return;
    else {
      setQuantity(quantity - 1);
    }
  };
  const incrementQuantity = () => {
    if (quantity >= state.stock) return;
    else {
      setQuantity(quantity + 1);
    }
  };

  const navigate = useNavigate();
  return (
    <div
      className={`w-screen h-screen md:p-10 bg-[rgba(255,255,255,0.8)] ${
        productPopUpShow.show ? "flex" : "hidden"
      } items-center justify-center fixed top-0 left-0 right-0 bottom-0 z-[10000]`}
    >
      <div
        className=" md:container w-[90%] h-[90vh] overflow-y-auto sm:w-[80%] lg:w-[70%] md:h-[80vh] py-4 md:p-6 flex flex-col justify-center items-center bg-white 
    shadow-2xl rounded-lg shadow-[rgba(0,0,0,0.5)]"
      >
        {/* product details  */}
        <div className="relative flex items-center gap-3 flex-wrap  md:flex-nowrap px-5 rounded-sm overflow-y-auto ">
          <div className="basis-full md:basis-[40%] mx-auto overflow-y-auto">
            <img src={state.image} alt="" className=" w-full h-full object-contain" />
          </div>
          <div className="container relative basis-full mx-auto md:basis-[60%] bg-gray-100 px-4 py-2 space-y-2 rounded-md">
            <h1 className="text-base w-[80%] font-medium ">
              {state.productname}
            </h1>
            <p className="text-sm text-lightText pb-3 border-b-2 font-medium">
              {state.category}
            </p>
            <div className="flex items-center justify-between border-b-2 pb-3">
              <p className="flex items-center gap-3">
                <span className=" flex items-center gap-1 text-red-500 font-bold text-2xl">
                  <TbCurrencyTaka size={25} />{" "}
                  {state.discountPrice
                    ? parseInt(state.price - state.discountPrice)
                    : parseInt(state.price)}
                </span>
                <span
                  className=" flex items-center gap-1 text-lightText font-bold text-xl
            line-through  decoration-2"
                >
                  <TbCurrencyTaka />
                  {state.discountPrice
                    ? parseInt(state.price)
                    : parseInt(state.demoprice)}
                </span>
                / pack
              </p>

              <AiOutlineHeart
                onClick={addToWishList}
                size={30}
                className="cursor-pointer text-secondary"
              />
            </div>
            <div className="flex items-center justify-between border-b-2 pb-3">
              <p className=" flex text-sm items-center gap-4 font-medium">
                <span className="text-lightText">Brand</span>
                {state.brand}
              </p>
              {state.stock < 1 ? (
                <p className=" text-red-500 font-semibold text-sm">
                  {" "}
                  Out Of Stock
                </p>
              ) : (
                <p className=" text-secondary font-semibold text-sm">
                  {state.stock} In Stock
                </p>
              )}
            </div>
            <div
              className="h-[7rem] overflow-y-scroll scroll-smooth 
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            >
              <p className="text-sm">{state.description}</p>
            </div>
            <div className="py-3 border-t-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className=" p-2 text-lg">
                  <AiOutlineMinus onClick={decrementQuantity} />
                </button>
                <p className=" py-1 px-3 text-base border border-lightText text-lightText rounded-full">
                  {quantity}
                </p>
                <button className=" p-2 text-lg">
                  <AiOutlinePlus onClick={incrementQuantity} />
                </button>
              </div>
              <button
                onClick={addToCartHandeler}
                disabled={state.stock === 0 ? true : false}
                className=" py-2 px-3 text-sm border bg-secondary text-white rounded-full
           hover:bg-transparent hover:text-secondary hover:border-secondary transition-all 
           duration-300 whitespace-pre"
              >
                {state.stock === 0 ? "Out Of Stock" : "Add To Cart"}
              </button>
            </div>
            <button
              onClick={() => navigate("/")}
              className=" absolute top-2 right-2"
            >
              <RxCross2
                onClick={() =>
                  setProductPopUpShow({ ...productPopUpShow, show: false })
                }
                size={30}
              />
            </button>
          </div>
          {state.discountInPercent && (
            <div className="absolute top-2 left-2 bg-secondary w-20 h-20 rounded-full z-[100] text-bgColor text-[1.2rem] flex flex-col justify-center items-center">
              {state.discountInPercent}%<span className="">Off</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPopUp;
