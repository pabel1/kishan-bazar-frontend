import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteShippingAPI,
  getAllShippingCostAPI,
} from "../../../api/shippingApi";
import { ShippingCost } from "../../../context";

const AllShipping = () => {
  const navigate = useNavigate();
  const [shippingData, setShippingData] = useState([]);
  const thData = [
    "Inside Dhaka",
    "Outside Dhaka",
    "Bkash No",
    "Nagad No",
    "Rocket No",
    "Action",
  ];

  const handleDeleteShipping = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteShippingAPI(id); // api call
        if (res && res.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          navigate("/admin");
        }
      }
    });
  };

  // getting shipping cost details
  useEffect(() => {
    const getShipping = async () => {
      const res = await getAllShippingCostAPI(); // api call
      if (res && res.status === 200) {
        setShippingData([...res.data.shippingCost]);
      }
    };
    getShipping();
  }, []);

  return (
    <>
      <div className="w-full h-[40%] mt-4">
        <h3 className="font-semibold text-textColor mb-2">
          All Shipping Costs
        </h3>
        <div className="w-full h-full overflow-x-auto border border-gray-400 rounded-lg">
          <table className=" bg-bgColor  whitespace-nowrap w-full h-full p-[4rem] border-collapse">
            <thead className="bg-gray-200">
              <tr>
                {thData?.map((item, index) => (
                  <th
                    key={index}
                    className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-secondary text-left"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shippingData &&
                shippingData.reverse().map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.insideDhaka}
                      </td>
                      <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.outsideDhaka}
                      </td>
                      <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.bkashNo}
                      </td>
                      <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.nagadNo}
                      </td>

                      <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.rocketNo}
                      </td>
                      <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        <div className="flex gap-4 items-center">
                          <Link
                            to={`/admin/updateshipping/${data._id}`}
                            state={data}
                          >
                            <AiOutlineEdit
                              className="cursor-pointer text-secondary"
                              size={20}
                            />
                          </Link>

                          <AiOutlineDelete
                            onClick={() => handleDeleteShipping(data._id)}
                            className="cursor-pointer text-red-500"
                            size={20}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllShipping;
