import React, { useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsBoxArrowInRight } from "react-icons/bs";
import { ImSad } from "react-icons/im";
import { FaArrowLeft, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext, UserContext } from "../../context";

const CheckoutSlide = ({
  showLargeCart,
  setShowLargeCart,
  showSmallCart,
  setShowSmallCart,
}) => {
  const { cartState, setCartState } = useContext(CartContext);
  const { userState, setUserState } = useContext(UserContext);
  let subtotal = cartState?.reduce((acc, item) => {
    return acc + parseInt(item.price) * item.quantity;
  }, 0);

  const handleDeleteCartItem = (delete_productid) => {
    const newProducts = cartState.filter(
      (item) => item.productId !== delete_productid
    );
    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    setCartState([...newProducts]);
  };

  const handleDeleteAllCartItem = () => {
    localStorage.setItem("cartProducts", JSON.stringify([]));
    setCartState([]);
  };
  const decrementQuantity = (productId, Quantity, index) => {
    const Findproduct =
      cartState && cartState.find((product) => product.productId === productId);
    if (Quantity < 2) return;
    else {
      Findproduct.quantity = Quantity - 1;
      cartState[index] = Findproduct;
      setCartState([...cartState]);
    }
  };

  const incrementQuantity = (productId, Quantity, Stock, index) => {
    const Findproduct =
      cartState && cartState.find((product) => product.productId === productId);
    if (Quantity >= Stock) return;
    else {
      Findproduct.quantity = Quantity + 1;
      cartState[index] = Findproduct;
      setCartState([...cartState]);
    }
  };

  return (
    <div
      className={`hidden md:block w-[25rem] h-screen p-4 bg-white border-l shadow-xl shadow-black absolute top-[174%] right-[-80%] transition-all duration-[0.5s] ${
        showLargeCart ? "translate-x-0" : "translate-x-[120%]"
      }`}
    >
      <div className="h-[10%] flex justify-between items-center">
        <h6 className="text-[1rem] font-medium">
          Cart Items ({cartState.length})
        </h6>
        <button
          onClick={handleDeleteAllCartItem}
          className=" text-[0.8rem] px-[0.4rem] py-[0.1rem] border border-primaryColor text-primaryColor rounded-md transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor"
        >
          Remove All
        </button>
      </div>
      <div
        onClick={() => {
          setShowSmallCart(!showSmallCart);
          setShowLargeCart(!showLargeCart);
        }}
        className="absolute rounded-l-md top-[10%] right-full w-8 h-12 flex items-center justify-center bg-bgColor border border-l-primaryColor text-primaryColor"
      >
        <BsBoxArrowInRight />
      </div>

      <div
        className="h-[40%] flex flex-col gap-4 overflow-y-scroll scroll-smooth 
      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-white 
      scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
      {cartState.length===0 && <h1 className="flex gap-x-2 items-center text-base text-secondary mt-8">
              <ImSad className="text-6xl" />
              Your Cart is empty!
            </h1>}
        {cartState &&
          cartState.map((item, index) => (
            <div
              key={index}
              className="w-full h-[6rem] px-4 py-3 shadow-md border-gray-300 flex gap-x-1 items-center"
            >
              <div className="w-[30%] h-full flex items-center justify-center">
                <img
                  className="w-[4.5rem] h-[4.5rem] object-cover"
                  src={item.image}
                  alt="CartItem"
                />
              </div>
              <div className="w-[70%] h-full flex flex-col gap-y-1 justify-evenly">
                <div className="w-full flex justify-between items-center">
                  <h6 className="text-[0.9rem] text-textColor font-medium">
                    {item.productname.slice(0, 20)}..
                  </h6>
                  <AiOutlineClose
                    onClick={() => handleDeleteCartItem(item.productId)}
                    className="text-red-400"
                  />
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-[6rem] flex gap-0 justify-evenly items-center">
                    <FaMinusCircle
                      onClick={() =>
                        decrementQuantity(item.productId, item.quantity, index)
                      }
                      className="w-[25%] text-[1.2rem] text-primaryColor cursor-pointer"
                    />
                    <p className="w-[50%] rounded-xl text-center text-[1rem] ">
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
                      className="w-[25%] text-[1.2rem] text-primaryColor cursor-pointer"
                    />
                  </div>
                  <h6 className="text-[1rem] text-textColor font-medium">
                    &#2547; {parseInt(item.price) * parseInt(item.quantity)}
                  </h6>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="h-[50%] flex flex-col mt-5">
        <div className="flex justify-between px-4">
          <h6 className="text-[1rem] text-textColor font-semibold">
            Sub Total
          </h6>
          <h6 className="text-[1rem] text-textColor font-semibold">
            &#2547;{subtotal}
          </h6>
        </div>
        <Link
          to={`${userState.isLogin ? "/checkout" : "/login"}`}
          className="text-[1rem] text-center px-[0.4rem] py-[0.2rem] bg-primaryColor text-bgColor rounded-full transition-all duration-[0.3s]"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CheckoutSlide;
