import React, { useContext, useEffect, useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";
import { CiWallet } from "react-icons/ci";
import { HiReceiptPercent } from "react-icons/hi2";
import { AiOutlineDoubleRight } from "react-icons/ai";
import cashondelivery from "../../assets/images/cashondelivery.png";
import bkash from "../../assets/images/bkash.svg";
import nagad from "../../assets/images/nagad.svg";
import rocket from "../../assets/images/rocket.svg";
import { paymentFormValidation } from "../../validation/FormValidation";
import {
  CartContext,
  PaymentInfoContext,
  ShippingCost,
  ShippingInfoContext,
} from "../../context";
import { checkCouponAPI } from "../../api/couponApi";
import { toast } from "react-toastify";

const PaymentTab = ({ paymentMethod, setPaymentMethod }) => {
  const [showCoupon, setShowCoupon] = useState(false);
  const { cartState } = useContext(CartContext);
  let subtotal = cartState?.reduce((acc, item) => {
    return acc + parseInt(item.price) * item.quantity;
  }, 0);
  const { paymentInfo, setPaymentInfo } = useContext(PaymentInfoContext);
  const { shipping } = useContext(ShippingCost);
  const { shippingInfo } = useContext(ShippingInfoContext);
  const [transactionId, setTransactionId] = useState("");
  const [cupon, setCoupon] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(1);
  const toggleTab = (index) => {
    setShowPaymentMethod(index);
  };
  const handlePaymentInfo = (e) => {
    e.preventDefault();
    const isValid = paymentFormValidation({ paymentMethod, transactionId });
    if (isValid) {
      setPaymentInfo({ ...paymentInfo, paymentMethod, transactionId });
      toast.success("Transaction Id Added");
    }
  };
  // useEffect(() => {
  //   localStorage.setItem("paymentInfo", JSON.stringify(paymentInfo));
  // }, [paymentInfo]);

  const handleCuponAdd = async (e) => {
    const res = await checkCouponAPI(cupon); // api call
    if (res && res.status === 200) {
      toast.success("Coupon Code Added");
      if (res.data.cupon.discountType === "Tk") {
        subtotal = parseInt(
          subtotal - parseInt(res.data.cupon.discountPercent)
        );
      }
      if (res.data.cupon.discountType === "%") {
        let tk = parseInt(
          (subtotal * parseInt(res.data.cupon.discountPercent)) / 100
        );
        subtotal = subtotal - tk;
      }

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
      setCoupon("");
    }
  };

  return (
    <div className="w-full mx-auto rounded-xl bg-[#f7f5f3] mt-7 p-[2rem]">
      <h2 className="text-primaryColor font-semibold text-[1.2rem] text-left mb-4">
        Choose Payment Method
      </h2>
      {/* payment tabs */}
      <div className="grid grid-cols-2 gap-x-5  md:flex justify-between gap-4  mb-8">
        <div
          onClick={() => {
            setTransactionId("");
            setCoupon("");
            toggleTab(1);
            setPaymentMethod("cashOnDelivery");
            paymentInfo.transactionId && delete paymentInfo.transactionId;
            setPaymentInfo({
              ...paymentInfo,
              paymentMethod: "cashOnDelivery",
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
          }}
          className={`${showPaymentMethod===1 && "bg-gray-300"} w-32 h- cursor-pointer flex justify-center items-center border border-secondary rounded-xl`}
        >
          <img
            src={cashondelivery}
            alt=""
            className="w-16 object-cover object-center"
          />
        </div>
        <div
          onClick={() => {
            setCoupon("");
            setTransactionId("");
            toggleTab(2);
            setPaymentMethod("bkash");
            setPaymentInfo({
              ...paymentInfo,
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
          }}
          className={`${showPaymentMethod===2 && "bg-gray-300"} w-32 h-20 flex cursor-pointer justify-center items-center border border-secondary rounded-xl`}
        >
          <img src={bkash} alt="" className="w-28 object-cover object-center" />
        </div>
        <div
          onClick={() => {
            setCoupon("");
            setTransactionId("");
            toggleTab(3);
            setPaymentMethod("nagad");
            setPaymentInfo({
              ...paymentInfo,
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
          }}
          className={`${showPaymentMethod===3 && "bg-gray-300"} w-32 h-20 flex cursor-pointer justify-center items-center border border-secondary rounded-xl`}
        >
          <img src={nagad} alt="" className="w-28 object-cover object-center" />
        </div>
        <div
          onClick={() => {
            setCoupon("");
            setTransactionId("");
            toggleTab(4);
            setPaymentMethod("rocket");
            setPaymentInfo({
              ...paymentInfo,
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
          }}
          className={`${showPaymentMethod===4 && "bg-gray-300"} w-32 h-20 flex cursor-pointer justify-center items-center border border-secondary rounded-xl`}
        >
          <img
            src={rocket}
            alt=""
            className="w-24 object-cover object-center"
          />
        </div>
      </div>

      {/* payment tab content */}
      <div
        className={`${
          showPaymentMethod === 1 ? "block" : "hidden"
        } flex flex-col gap-4 mt-4`}
      >
        <div className="flex flex-col justify-between px-8 py-4 rounded-xl bg-white">
          <div className="flex gap-2 justify-start items-center">
            <HiReceiptPercent className="text-[2.5rem] text-primaryColor" />
            <h3>
              Apply Coupon/ Referral Code
              <AiOutlineDoubleRight
                onClick={() => setShowCoupon(!showCoupon)}
                className="inline-block text-primaryColor animate-pulse text-[1.4rem] cursor-pointer"
              />
            </h3>
          </div>
          {showCoupon && (
            <div className="flex justify-between mt-2 transition-all duration-[1s]">
              <input
                type="text"
                value={cupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
                placeholder="Enter Code"
              />
              <button
                onClick={handleCuponAdd}
                className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          showPaymentMethod === 2 ? "block" : "hidden"
        } flex flex-col gap-4 mt-4`}
      >
        <div className="flex flex-col justify-between px-4 py-4 rounded-xl bg-white ">
          <div className="flex gap-2 justify-start items-center">
            <HiReceiptPercent className="text-[2.5rem] text-primaryColor" />
            <h3>
              Apply Coupon/ Referral Code
              <AiOutlineDoubleRight
                onClick={() => setShowCoupon(!showCoupon)}
                className="inline-block text-primaryColor animate-pulse text-[1.4rem] cursor-pointer"
              />
            </h3>
          </div>
          {showCoupon && (
            <div className=" w-full flex justify-between flex-wrap  gap-3 mt-2 transition-all duration-[1s]">
              <input
                type="text"
                value={cupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
                placeholder="Enter Code"
              />
              <button
                onClick={handleCuponAdd}
                className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between px-4 py-4 rounded-xl bg-white">
          <div className="flex gap-2 justify-start items-center">
            <FaMoneyCheck className="text-[2.5rem] text-primaryColor" />
            <h3>
              Pay With Bkash:{" "}
              <span className="font-semibold">{shipping.bkashNo}</span>
              <span className="text-[0.7rem] font-normal">
                (After Pay Copy the TransactionId)
              </span>
            </h3>
          </div>
          <div className=" flex justify-between gap-3 flex-wrap mt-2 transition-all duration-[1s]">
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
              placeholder="Enter Transaction ID"
            />
            <button
              onClick={handlePaymentInfo}
              className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          showPaymentMethod === 3 ? "block" : "hidden"
        } flex flex-col gap-4 mt-4`}
      >
        <div className="flex flex-col justify-between px-4 py-4 rounded-xl bg-white">
          <div className="flex gap-2 justify-start items-center">
            <HiReceiptPercent className="text-[2.5rem] text-primaryColor" />
            <h3>
              Apply Coupon/ Referral Code
              <AiOutlineDoubleRight
                onClick={() => setShowCoupon(!showCoupon)}
                className="inline-block text-primaryColor animate-pulse text-[1.4rem] cursor-pointer"
              />
            </h3>
          </div>
          {showCoupon && (
            <div className="flex justify-between mt-2 transition-all duration-[1s]">
              <input
                type="text"
                value={cupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
                placeholder="Enter Code"
              />
              <button
                onClick={handleCuponAdd}
                className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between px-8 py-4 rounded-xl bg-white">
          <div className="flex gap-2 justify-start items-center">
            <FaMoneyCheck className="text-[2.5rem] text-primaryColor" />
            <h3>
              Pay With Nagad:{" "}
              <span className="font-semibold">{shipping.nagadNo}</span>
              <span className="text-[0.7rem] font-normal">
                (After Pay Copy the TransactionId)
              </span>
            </h3>
          </div>
          <div className="flex justify-between mt-2 transition-all duration-[1s]">
            <input
              type="text"
              className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter Transaction ID"
            />
            <button
              onClick={handlePaymentInfo}
              className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          showPaymentMethod === 4 ? "block" : "hidden"
        } flex flex-col gap-4 mt-4`}
      >
        <div className="flex flex-col justify-between px-4 py-4 rounded-xl bg-white">
          <div className="flex gap-2 justify-start items-center">
            <HiReceiptPercent className="text-[2.5rem] text-primaryColor" />
            <h3>
              Apply Coupon/ Referral Code
              <AiOutlineDoubleRight
                onClick={() => setShowCoupon(!showCoupon)}
                className="inline-block text-primaryColor animate-pulse text-[1.4rem] cursor-pointer"
              />
            </h3>
          </div>
          {showCoupon && (
            <div className="flex justify-between mt-2 transition-all duration-[1s]">
              <input
                type="text"
                value={cupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
                placeholder="Enter Code"
              />
              <button
                onClick={handleCuponAdd}
                className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between px-4 py-4 rounded-xl bg-white">
          <div className="flex gap-2 justify-start items-center">
            <FaMoneyCheck className="text-[2.5rem] text-primaryColor" />
            <h3>
              Pay With Rocket:{" "}
              <span className="font-semibold">{shipping.rocketNo}</span>{" "}
              <span className="text-[0.7rem] font-normal">
                (After Pay Copy the TransactionId)
              </span>
            </h3>
          </div>
          <div className="flex justify-between mt-2 transition-all duration-[1s]">
            <input
              type="text"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-[80%] outline-none border border-primaryColor px-[0.8rem] py-[0.5rem] rounded-full"
              placeholder="Enter Transaction ID"
            />
            <button
              onClick={handlePaymentInfo}
              className="flex items-center gap-2 text-primaryColor px-[0.8rem] py-[0.5rem] border border-primaryColor rounded-full"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTab;
