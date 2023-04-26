import React, { useContext } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { CartContext } from "../../context";
const CheckoutItem = ({
  productId,
  name,
  image,
  price,
  quantity,
  stock,
  index,
}) => {
  const { cartState, setCartState } = useContext(CartContext);

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
  const handleDeleteCartItem = (delete_productid) => {
    const newProducts = cartState.filter(
      (item) => item.productId !== delete_productid
    );
    localStorage.setItem("cartProducts", JSON.stringify(newProducts));
    setCartState([...newProducts]);
  };
  return (
    <div className="w-full h-[5rem] border-b border-primaryColor flex justify-between items-center ">
      <div className="w-[50%] flex items-center">
        <img
          className="w-[4rem] h-[4rem] object-cover rounded-xl ml-4"
          src={image}
          alt="CartItem"
        />
        <h3 className="text-left ml-4 text-[1rem]">{name}</h3>
      </div>
      <div className="w-[50%] flex justify-evenly items-center">
        <div className="w-[6rem] flex gap-1 justify-evenly items-center">
          <FaMinusCircle
            onClick={() => decrementQuantity(productId, quantity, index)}
            className="w-[25%] text-[1.5rem] text-primaryColor cursor-pointer"
          />
          <p className="w-[50%] rounded-xl text-center text-[1rem] ">
            {quantity}
          </p>
          <FaPlusCircle
            onClick={() =>
              incrementQuantity(productId, quantity, parseInt(stock), index)
            }
            className="w-[25%] text-[1.5rem] text-primaryColor cursor-pointer"
          />
        </div>
        <h6 className="text-lightText text-[0.8rem]">
          &#2547;{parseInt(price)}
        </h6>
        <h5 className="text-textColor font-semibold">
          &#2547;{parseInt(price) * quantity}
        </h5>
        <AiOutlineClose
          onClick={() => handleDeleteCartItem(productId)}
          className="text-[1.8rem] text-primaryColor cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CheckoutItem;
