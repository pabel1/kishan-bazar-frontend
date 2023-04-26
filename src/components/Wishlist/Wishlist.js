import React, { useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { ImSad } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { CartContext, WishListContext } from "../../context";
import CommonLayout from "../../Pages/CommonLayout";
import AboutUsCard from "../AboutUs/AboutUsCard";
import { aboutCardData, cartItem } from "../data/data";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishListState, setWishListState } = useContext(WishListContext);
  const { cartState, setCartState } = useContext(CartContext);

  const decrementQuantity = (productId, Quantity, index) => {
    const Findproduct =
      wishListState &&
      wishListState.find((product) => product.productId === productId);
    if (Quantity < 2) return;
    else {
      Findproduct.quantity = Quantity - 1;
      wishListState[index] = Findproduct;
      setWishListState([...wishListState]);
    }
  };

  const incrementQuantity = (productId, Quantity, Stock, index) => {
    const Findproduct =
      wishListState &&
      wishListState.find((product) => product.productId === productId);
    if (Quantity >= Stock) return;
    else {
      Findproduct.quantity = Quantity + 1;
      wishListState[index] = Findproduct;
      setWishListState([...wishListState]);
    }
  };

  const addWishListToCart = (delete_productid, item) => {
    let currentProduct = { ...item };
    const productExistInCart = cartState.find(
      (item) => item.productId === currentProduct.productId
    );

    if (!productExistInCart) {
      const newProducts = wishListState.filter(
        (item) => item.productId !== delete_productid
      );
      localStorage.setItem("cartProducts", JSON.stringify(newProducts));
      setWishListState([...newProducts]);
      setCartState([...cartState, item]);
    }
  };

  const handleDeleteWishListItem = (delete_productid) => {
    const newProducts = wishListState.filter(
      (item) => item.productId !== delete_productid
    );
    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    setWishListState([...newProducts]);
  };

  return (
    <CommonLayout>
      <div className="container w-full h-auto mb-[10rem] md:pt-10   mt-6 lg:mt-0 ">
        <div className="flex flex-col items-start">
          <h1 className="text-secondary font-semibold text-[1.2rem]">
            My Wishlist
          </h1>
        </div>
        {/* cart items */}
        {wishListState.length !== 0 ? (
          <div className="w-full flex flex-col gap-2 justify-center items-center mt-5">
            {wishListState &&
              wishListState.map((item, index) => (
                <div className="w-full h-[5rem] border-b border-primaryColor flex justify-between items-center ">
                  <div className=" flex items-center gap-2 flex-wrap md:flex-none">
                    <img
                      className="w-16 object-cover rounded-xl ml-4"
                      src={item.image}
                      alt="CartItem"
                    />
                    <h3 className="text-left ml-4 text-[1rem]">
                      {item.productname.slice(0, 30)}
                    </h3>
                  </div>
                  <div className=" flex  items-center flex-wrap justify-around gap-x-8">
                    <div className="w-[6rem] flex  justify-evenly items-center ">
                      <FaMinusCircle
                        onClick={() =>
                          decrementQuantity(
                            item.productId,
                            item.quantity,
                            index
                          )
                        }
                        className="text-[1.5rem] text-primaryColor cursor-pointer"
                      />
                      <p className=" rounded-xl text-center text-lg ">
                        {item.quantity}
                      </p>
                      <FaPlusCircle
                        onClick={() =>
                          incrementQuantity(
                            item.productId,
                            item.quantity,
                            parseInt(item.stock),
                            index
                          )
                        }
                        className="text-[1.5rem] text-primaryColor cursor-pointer"
                      />
                    </div>

                    <h5 className="text-textColor  text-lg font-semibold">
                      &#2547;
                      {parseInt(item.price) * item.quantity}
                    </h5>

                    <button
                      onClick={() => addWishListToCart(item.productId, item)}
                      className=" whitespace-pre text-sm text-center px-2 mx-1 py-[0.4rem] bg-primaryColor text-bgColor rounded-full transition-all duration-[0.3s]"
                    >
                      Add To Cart
                    </button>
                    <AiOutlineClose
                      onClick={() => handleDeleteWishListItem(item.productId)}
                      className="text-[1.8rem] text-primaryColor cursor-pointer"
                    />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div>
            <h1 className="flex gap-x-2 items-center text-base text-secondary mt-8">
              <ImSad className="text-6xl" />
              Your wishlist is empty!
            </h1>
          </div>
        )}
      </div>
      {/* aboutus cards */}
      <div className="w-full px-20 flex gap-4 justify-evenly flex-wrap md:flex-nowrap mt-10">
        {aboutCardData &&
          aboutCardData.map((item, index) => (
            <AboutUsCard
              key={index}
              Icon={item.icon}
              name={item.name}
              details={item.details}
            />
          ))}
      </div>
    </CommonLayout>
  );
};

export default Wishlist;
