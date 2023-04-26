import React, { useContext } from "react";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../context";

const CheckoutCartSlideSmall = ({
  showLargeCart,
  setShowLargeCart,
  showSmallCart,
  setShowSmallCart,
}) => {
  const { cartState } = useContext(CartContext);
  const { userState } = useContext(UserContext);
  let subtotal = cartState?.reduce((acc, item) => {
    return acc + parseInt(item.price) * item.quantity;
  }, 0);
  return (
    cartState.length !== 0 && (
      <div
        onClick={() => {
          setShowSmallCart(!showSmallCart);
          setShowLargeCart(!showLargeCart);
        }}
        className={`hidden lg:block w-[7rem] h-screen p-3 bg-white border-l shadow-xl shadow-black absolute top-[174%] right-[-80%] transition-all duration-[1s] ${
          showSmallCart ? "translate-x-0" : "translate-x-[120%]"
        }`}
      >
        <div className="h-[55%] flex flex-col gap-6 overflow-auto scrollbar-hide">
          {cartState &&
            cartState.map((item, index) => (
              <div
                key={index}
                className="relative w-full h-[5rem] py-3 border-gray-300 flex flex-col justify-evenly"
              >
                <MdOutlineDone className="absolute right-0 top-[10%] z-40" />
                <img
                  className="drop-shadow-xl shadow-slate-600 right-[5%] w-[4rem] h-[4rem] object-cover rounded-xl ml-4"
                  src={item.image}
                  alt="CartItem"
                />
              </div>
            ))}
        </div>
        <div className="h-[45%] flex flex-col mt-4 border-t border-primaryColor">
          <div className="flex flex-col justify-center items-center my-4">
            <h6 className="text-[1.5rem] text-textColor font-medium">Total</h6>
            <h6 className="text-[1.2rem] text-textColor font-medium">
              &#2547; {subtotal}
            </h6>
          </div>
          <Link
            to={`${userState.isLogin ? "/checkout" : "/login"}`}
            className="text-[0.9rem] text-center px-[0.4rem] py-[0.2rem] bg-primaryColor text-bgColor rounded-full transition-all duration-[0.3s]"
          >
            Checkout
          </Link>
        </div>
      </div>
    )
  );
};

export default CheckoutCartSlideSmall;
