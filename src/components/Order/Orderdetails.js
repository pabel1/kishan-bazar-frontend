import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrderAPI } from "../../api/orderApi";
import {
  CartContext,
  PaymentInfoContext,
  ShippingInfoContext,
  UserContext,
} from "../../context";
import CommonLayout from "../../Pages/CommonLayout";
import Footer from "../Footer/Footer";

const Orderdetails = () => {
  const navigate = useNavigate();
  const { cartState, setCartState } = useContext(CartContext);
  const { userState, setUserState } = useContext(UserContext);
  const { shippingInfo, setShippingInfo } = useContext(ShippingInfoContext);
  const { paymentInfo, setPaymentInfo } = useContext(PaymentInfoContext);

  let subtotal = cartState?.reduce((acc, item) => {
    return acc + parseInt(item.price) * item.quantity;
  }, 0);

  const order = {
    shippingInfo: shippingInfo,
    paymentInfo: paymentInfo,
    orderItems: cartState,
    orderId: Date.now(),
  };
  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    const isOK =
      Object.keys(paymentInfo).length !== 0 &&
      Object.keys(shippingInfo).length !== 0;
    if (isOK) {
      const res = await createOrderAPI(order);
      if (res && res.status === 201) {
        toast.success(res.data.message);
        setPaymentInfo({});
        setShippingInfo([]);
        setCartState([]);
        localStorage.setItem("cartProducts", null);
        localStorage.setItem("shippingInfo", null);
        localStorage.setItem("paymentInfo", null);

        navigate("/ordersuccess", { state: order });
      }
    }
  };

  return (
    <CommonLayout>
      <div className="md:ml-10 md:mt-5 border border-secondary rounded-lg p-4">
        <h1 className="text-center text-[1.4rem] font-bold text-secondary p-2 rounded-md mb-2">
          Order Details
        </h1>
        <div className="flex flex-col md:flex-row gap-x-6 justify-start">
          <div className="w-full md:w-[60%] h-full flex flex-col gap-y-4 justify-start items-center">
            <div className="w-full h-[40%]">
              <h4 className="bg-secondary text-bgColor p-2 rounded-md mb-2">
                Shipping Info
              </h4>
              <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                <h6>Name- {userState.user.name}</h6>
                <h6>Email- {userState.user.email}</h6>
                <h6>
                  Address- {shippingInfo.address},{shippingInfo.city}
                </h6>
              </div>
            </div>
            <div className="w-full h-[60%] overflow-y-auto">
              <h4 className="bg-secondary text-bgColor p-2 rounded-md mb-2">
                Ordered Items
              </h4>
              <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                {cartState &&
                  cartState.map((item, index) => (
                    <div
                      key={index}
                      className="w-full h-[5rem] px-2 py-3 shadow-md border-gray-300 flex gap-x-1 items-center"
                    >
                      <div className="w-[20%] h-full flex items-center justify-center">
                        <img
                          className="w-[3.8rem] h-[3.8rem] rounded-lg object-cover"
                          src={item.image}
                          alt="CartItem"
                        />
                      </div>
                      <div className="w-[80%] h-full flex flex-col gap-y-1 justify-evenly">
                        <div className="w-full flex justify-between items-center">
                          <h6 className="text-[0.9rem] text-textColor font-medium">
                            {item.productname.slice(0, 30)}..
                          </h6>
                        </div>
                        <div className="w-full flex justify-between">
                          <div className="w-[6rem] flex gap-0 items-center">
                            <h4>Price: &#2547; {parseInt(item.price)}</h4>
                          </div>
                          <h6 className="text-[1rem] text-textColor font-medium">
                            &#2547; {parseInt(item.price)} X{" "}
                            {parseInt(item.quantity)} = &#2547;
                            {parseInt(item.price) * parseInt(item.quantity)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-[40%] h-full flex flex-col gap-y-4 justify-start items-center">
            <div className="w-full flex flex-col h-full">
              <h4 className="bg-secondary text-bgColor p-2 rounded-md mb-2">
                Payment Info
              </h4>
              <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                <h6>
                  Payment Method:{" "}
                  <span className="font-bold">{paymentInfo.paymentMethod}</span>{" "}
                </h6>
                {paymentInfo.transactionId && (
                  <h6>
                    Transaction Id:{" "}
                    <span className="font-bold">
                      {paymentInfo.transactionId}{" "}
                    </span>
                  </h6>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col h-full">
              <h4 className="bg-secondary text-bgColor p-2 rounded-md mb-2">
                Order Summery
              </h4>
              <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                <h6>SubTotal:&#2547; {paymentInfo.subtotal} </h6>
                <h6>Shipping Cose:&#2547; {paymentInfo.shippingCost} </h6>
                <h6>Total:&#2547; {paymentInfo.total} </h6>
                <button
                  onClick={handleConfirmOrder}
                  className=" text-[1rem] px-1 py-2 text-bgColor rounded-md bg-secondary border border-transparent transition-all duration-[0.3s] hover:border-primaryColor hover:bg-transparent hover:text-primaryColor"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </CommonLayout>
  );
};

export default Orderdetails;
