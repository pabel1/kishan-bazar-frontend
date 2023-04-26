import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { getMyOrdersAPI } from "../../../api/orderApi";
import MyOrderDetails from "./MyOrderDetails";

const MyOrders = ({ myOrders }) => {
  const navigate = useNavigate();
  const [details, setDatails] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  const thData = ["OrderId", "Status", "CreatedAt", "Total Price", "Action"];

  return (
    <>
      <div className="w-full h-full overflow-x-auto border border-gray-400 rounded-[1rem]">
        {!showDetails && (
          <table className=" bg-bgColor  whitespace-nowrap w-full h-full p-[4rem] border-collapse">
            <thead>
              <tr>
                {thData?.map((item, index) => (
                  <th
                    key={index}
                    className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-secondary text-left"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {myOrders &&
                myOrders.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data._id.toString().slice(0, 10)}...
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.orderStatus}
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {new Date(data.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        &#2547; {data.paymentInfo.total}
                      </td>

                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        <div className="flex gap-4 items-center">
                          <AiOutlineEye
                            onClick={() => {
                              setDatails({ ...data });
                              setShowDetails(!showDetails);
                            }}
                            className="cursor-pointer text-secondary"
                            size={20}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {showDetails && (
          <MyOrderDetails
            showDetails={showDetails}
            setShowDetails={setShowDetails}
            data={details}
          />
        )}
      </div>
    </>
  );
};

export default MyOrders;
