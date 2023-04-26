import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CartContext,
  ProductPopUpContex,
  WishListContext,
} from "../../context";
import ProductPopUp from "../PopUpScreen/ProductPopUp";
const ProductCard = ({ data }) => {
  const { setProductPopUpShow } = useContext(ProductPopUpContex);
  const { cartState, setCartState } = useContext(CartContext);
  const { wishListState, setWishListState } = useContext(WishListContext);
  const [quantity, setQuantity] = useState(1);

  const addToCartHandeler = () => {
    let currentProduct = { ...data };
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
          price: parseInt(currentProduct.price),
          image: currentProduct.image,
          stock: parseInt(currentProduct.stock),
          quantity: 1,
        },
      ]);
      toast.success("Product added to cart successfully");
    }
  };

  const addToWishList = () => {
    let currentProduct = { ...data };
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
          price: parseInt(currentProduct.price),
          image: currentProduct.image,
          stock: parseInt(currentProduct.stock),
          quantity: parseInt(currentProduct.quantity),
        },
      ]);
      toast.success("Product added to wishlist successfully");
    }
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartState));
  }, [cartState]);

  useEffect(() => {
    localStorage.setItem("wishListProducts", JSON.stringify(wishListState));
  }, [wishListState]);
  return (
    <>
      {data && (
        <div
          className="my-2 mx-auto w-[11rem] h-[16rem] p-2  text-center group border-2  
          flex flex-col items-center justify-between rounded-md cursor-pointer"
        >
          <img
            onClick={() => setProductPopUpShow({ show: true, data: data })}
            src={data.image}
            alt="Product"
            className="w-32 object-cover group-hover:scale-[1.08] transition-all 
          duration-500 overflow-hidden overflow-y-hidden"
          />

          <div className=" w-full  flex flex-col  justify-between mb-2  ">
            <p
              onClick={() => setProductPopUpShow({ show: true, data: data })}
              className="w-full  text-sm white text-left hover:text-primaryColor cursor-pointer"
            >
              {data.productname.slice(0, 50)}
            </p>

            {/* <Link
              to={`/products/${data.productname
                .replace(/\s/g, "_")
                .toLowerCase()}`}
              state={data}
            >
              {" "}
              <p className="w-full  text-sm white text-left hover:text-primaryColor cursor-pointer">
                {data.productname.slice(0, 50)}
              </p>
            </Link> */}
            <p className="w-full h-[20%] text-left text-xl text-yellow-500 flex  items-center justify-between">
              &#2547; {parseInt(data.price)}
              <span className="text-left text-gray-500 line-through text-base  decoration-[1px]]">
                {data.demoprice}
              </span>
            </p>
            <div className="Aw-full h-[15%] flex items-center justify-around  gap-x-2 my-2 text-left ">
              <button
                className=" p-1  border-[1.8px] border-secondary rounded-full
           text-secondary hover:bg-secondary hover:text-white "
              >
                <AiOutlineHeart onClick={addToWishList} size={18} />
              </button>

              <button
                disabled={data.stock === 0 ? true : false}
                onClick={addToCartHandeler}
                className=" py-[6px] px-3 border-[1.8px] border-secondary rounded-full
           hover:bg-secondary hover:text-white whitespace-pre text-sm"
              >
                {data.stock === 0 ? "Out Of Stock" : "Add To Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
