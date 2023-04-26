import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllShippingCostAPI } from "../../api/shippingApi";
import {
  CartContext,
  PaymentInfoContext,
  ShippingCost,
  ShippingInfoContext,
} from "../../context";
import CheckoutItem from "./CheckoutItem";
import DeliverAddress from "./DeliverAddress";
import PaymentTab from "./PaymentTab";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const { cartState } = useContext(CartContext);
  const { shippingInfo } = useContext(ShippingInfoContext);
  const { shipping, setShipping } = useContext(ShippingCost);
  const { paymentInfo, setPaymentInfo } = useContext(PaymentInfoContext);
  let subtotal = cartState?.reduce((acc, item) => {
    return acc + parseInt(item.price) * item.quantity;
  }, 0);

  // getting shipping cost details
  useEffect(() => {
    const getShipping = async () => {
      const res = await getAllShippingCostAPI(); // api call
      if (res && res.status === 200) {
        setShipping({
          ...res.data.shippingCost[res.data.shippingCost.length - 1],
        });
      }
    };
    getShipping();
  }, []);
  const handlePlaceOrder = () => {
    if (paymentMethod === "") {
      toast.info("Choose a Payment Method");
    } else if (
      Object.keys(shippingInfo).length === 0 ||
      Object.keys(paymentInfo).length === 0 ||
      Object.keys(shipping).length === 0
    ) {
      toast.info("Please Enter the Address");
    } else {
      if (!paymentInfo.subtotal) {
        setPaymentInfo({
          ...paymentInfo,
          subtotal,
          shippingCost:
            shippingInfo.city !== "Dhaka"
              ? shipping.outsideDhaka
              : shipping.insideDhaka,
          total:
            subtotal +
            (shippingInfo.city !== "Dhaka"
              ? shipping.outsideDhaka
              : shipping.insideDhaka),
        });
      }
      navigate("/orderdetails");
    }
  };

  useEffect(() => {
    if (cartState?.length === 0) {
      navigate("/", { replace: true });
    }
  }, [cartState?.length]);
  return (
    <div className=" container w-full h-auto mb-[10rem] pt-10   lg:mt-0">
      <div className="flex flex-col items-start">
        <h1 className="text-secondary font-semibold text-[1.2rem]">
          Ready To Checkout!
        </h1>
        <h4 className="text-[1rem] font-semibold text-lightText">
          Forgot Something?
          <span className="text-textColor">Lets go to shop</span>
        </h4>
      </div>
      {/* cart items */}
      <div className="flex flex-col gap-2 justify-center items-center mt-5 ">
        {cartState &&
          cartState.map((item, index) => (
            <CheckoutItem
              key={index}
              productId={item.productId}
              name={item.productname}
              image={item.image}
              price={item.price}
              quantity={item.quantity}
              stock={item.stock}
              index={index}
            />
          ))}
      </div>
      {/* delivery address */}
      <DeliverAddress />

      {/* payment method add */}
      <PaymentTab
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      {/* subtotal and shipping cost */}
      <div
        className="w-full mx-auto flex justify-evenly gap-3 items-center border
       border-primaryColor rounded-xl mt-7 px-1 md:px-5 py-[2rem]"
      >
        <h3 className="  text-[1.2rem] font-semibold text-gray-500">
          Billing Summery
        </h3>
        <div className="flex flex-col  justify-center ">
          <h6 className="whitespace-pre text-lightText text-[1rem] font-medium">
            Sub Total
          </h6>
          <h2 className="text-textColor text-[1.2rem]">
            &#2547;{paymentInfo.subtotal ? paymentInfo.subtotal : subtotal}
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <h6s className="text-lightText text-[1rem] font-medium">Shipping</h6s>
          <h2 className="text-textColor text-[1.2rem]">
            &#2547;
            {paymentInfo.shippingCost
              ? paymentInfo.shippingCost
              : shipping.insideDhaka}
          </h2>
        </div>
      </div>

      {/* total cost */}
      <div className="w-[80%] mx-auto flex justify-between items-center rounded-xl p-[1rem]">
        <h3 className="text-[1.2rem] font-semibold text-gray-500">
          Total{" "}
          <span className="text-[1.6rem] text-textColor">
            &#2547;
            {paymentInfo.total
              ? paymentInfo.total
              : subtotal + shipping.insideDhaka}
          </span>
        </h3>
        {
          <button
            onClick={handlePlaceOrder}
            className=" whitespace-pre w-[40%] flex justify-center items-center gap-2 text-bgColor
             bg-secondary px-[0.8rem] py-3 rounded-full"
          >
            Place Order
          </button>
        }
      </div>
    </div>
  );
};

export default Checkout;
