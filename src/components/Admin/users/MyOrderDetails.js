import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSingleOrderDetailsAPI,
  updateOrderStatusAPI,
} from "../../../api/orderApi";

const MyOrderDetails = ({ showDetails, setShowDetails, data }) => {
  const handleUpdate = async () => {};
  return (
    <>
      <div className="relative w-full mx-auto rounded-xl bg-green-100 p-[1rem]">
        <h2 className="text-primaryColor font-semibold text-[1.2rem] text-left mb-4">
          Order Details
        </h2>
        {Object.keys(data).length !== 0 && (
          <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-[1rem] font-semibold text-secondary">
              Order Id: <span className="font-normal">{data._id}</span>
            </h1>
            <div className="w-full mx-auto flex px-8 py-4 gap-4 rounded-xl bg-white">
              <div className="w-[50%]  flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <h4 className="bg-secondary text-bgColor p-2 rounded-md">
                    Shipping Info
                  </h4>

                  <div className="bg-green-100 p-4 flex flex-col gap-y-2">
                    <h6>Name- {data.shippingInfo.name}</h6>
                    <h6>Email- {data.shippingInfo.email}</h6>
                    <h6>Phone- {data.shippingInfo.phone}</h6>
                    <h6>
                      Address- {data.shippingInfo.address},
                      {data.shippingInfo.city}
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h4 className="bg-secondary text-bgColor p-2 rounded-md">
                    Order Info
                  </h4>

                  <div className="bg-green-100 p-4 flex flex-col gap-y-2">
                    <h6>
                      Order Status-{" "}
                      <span className="text-red-400 font-medium">
                        {data.orderStatus}
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h4 className="bg-secondary text-bgColor p-2 rounded-md">
                    Payment Info
                  </h4>

                  <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                    <h6>
                      Payment Method:{" "}
                      <span className="font-medium text-red-400">
                        {data.paymentInfo.paymentMethod}
                      </span>{" "}
                    </h6>
                    {data.paymentInfo.transactionId && (
                      <h6>
                        Transaction Id:{" "}
                        <span className="font-medium text-red-400">
                          {data.paymentInfo.transactionId}{" "}
                        </span>
                      </h6>
                    )}
                    <h6>
                      Total:{" "}
                      <span className="font-medium text-red-400">
                        {data.paymentInfo.total}{" "}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="w-[50%] flex flex-col gap-y-4">
                <h4 className="bg-secondary text-bgColor p-2 rounded-md">
                  Ordered Items
                </h4>
                <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                  {data.orderItems.map((item, index) => (
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
                            <h4 className="text-[0.9rem] text-textColor font-medium">
                              Price: &#2547; {parseInt(item.price)}
                            </h4>
                          </div>
                          <h6 className="text-[0.9rem] text-textColor font-medium">
                            &#2547; {parseInt(item.price)}X
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
          </div>
        )}

        <AiOutlineClose
          onClick={() => setShowDetails(!showDetails)}
          className="text-[2rem] text-red-500 absolute top-10 right-10"
        />
      </div>
    </>
  );
};

export default MyOrderDetails;
