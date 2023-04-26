import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getSingleOrderDetailsAPI,
  updateOrderStatusAPI,
} from "../../../api/orderApi";
import { UserContext } from "../../../context";
const UpdateOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState("Processing");
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    const getSingleOrderDetails = async () => {
      const res = await getSingleOrderDetailsAPI(id); // api call
      if (res && res.status === 200) {
        setOrderDetails({ ...res.data.order });
      }
    };
    getSingleOrderDetails();
  }, []);

  const handleUpdate = async () => {
    const res = await updateOrderStatusAPI(id, status); // api call
    if (res && res.status === 200) {
      toast.success(res.data.message);
      navigate("/admin");
    }
  };
  return (
    <>
      <div className="w-full mx-auto rounded-xl bg-green-100 mt-7 md:p-[2rem]">
        <h2 className="text-primaryColor font-semibold text-[1.2rem] text-left mb-4">
          Update Order
        </h2>
        {Object.keys(orderDetails).length !== 0 && (
          <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-[1rem] font-semibold text-secondary">
              Order Id: <span className="font-normal">{orderDetails.orderId}</span>
            </h1>
            <div className="w-full mx-auto flex flex-col lg:flex-row px-2 md:px-8 py-4 gap-4 rounded-xl bg-white">
              <div className="w-full lg:w-[50%] flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                  <h4 className="bg-secondary text-bgColor p-2 rounded-md">
                    Shipping Info
                  </h4>

                  <div className="bg-green-100 p-4 flex flex-col gap-y-2">
                    <h6>Name- {orderDetails.shippingInfo.name}</h6>
                    <h6>Email- {orderDetails.shippingInfo.email}</h6>
                    <h6>Phone- {orderDetails.shippingInfo.phone}</h6>
                    <h6>
                      Address- {orderDetails.shippingInfo.address},
                      {orderDetails.shippingInfo.city}
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
                        {orderDetails.orderStatus}
                      </span>
                    </h6>
                    <select
                      className="w-full outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
                      name="discountType"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Choose Status</option>

                      {orderDetails.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {orderDetails.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
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
                        {orderDetails.paymentInfo.paymentMethod}
                      </span>{" "}
                    </h6>
                    {orderDetails.paymentInfo.transactionId && (
                      <h6>
                        Transaction Id:{" "}
                        <span className="font-medium text-red-400">
                          {orderDetails.paymentInfo.transactionId}{" "}
                        </span>
                      </h6>
                    )}
                    <h6>
                      Total:{" "}
                      <span className="font-medium text-red-400">
                        &#2547;{orderDetails.paymentInfo.total}{" "}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-[50%] flex flex-col gap-y-4">
                <h4 className="bg-secondary text-bgColor p-2 rounded-md">
                  Ordered Items
                </h4>
                <div className="bg-green-100 p-2 flex flex-col gap-y-2">
                  {orderDetails.orderItems.map((item, index) => (
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
                            &#2547;{parseInt(item.price)} X {" "}
                            {parseInt(item.quantity)} = &#2547;
                            {parseInt(item.price) * parseInt(item.quantity)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleUpdate}
                  className=" text-[1rem] px-1 py-2 text-primaryColor rounded-md bg-transparent border border-primaryColor transition-all duration-[0.3s] hover:bg-primaryColor hover:text-bgColor"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateOrder;
