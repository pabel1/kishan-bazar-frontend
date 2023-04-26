import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  deleteCampaignsAPI,
  getAllCampaignsAPI,
} from "../../../api/campaignApi";

const AllCampaigns = () => {
  const navigate = useNavigate();
  const [campaignsData, setCampaignsData] = useState([]);
  const thData = [
    "Name",
    "Valid Date",
    "Discount Tk",
    "Discount Percentage",
    "Image",
    "Category",
    "Action",
  ];

  // getting all campaigns
  useEffect(() => {
    const getAllCampaigns = async () => {
      const res = await getAllCampaignsAPI(); //api call
      if (res && res.status === 200) {
        setCampaignsData([...res.data.campaigns]);
      }
    };
    getAllCampaigns();
  }, []);

  const handleCampaignDelete = async (id) => {
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
        const res = await deleteCampaignsAPI(id); // api call
        if (res && res.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          navigate("/admin");
        }
      }
    });
  };

  return (
    <>
      <div className="w-full h-full overflow-x-auto border border-gray-400 rounded-lg">
        <table className=" bg-bgColor  whitespace-nowrap w-full h-full p-[4rem] border-collapse">
          {" "}
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
            {campaignsData &&
              campaignsData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.campaignname}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.validationDate}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.discountPriceInTk}
                    </td>

                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.discount}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <img
                        className="w-10 h-10 rounded-lg"
                        src={data.image?.url}
                        alt="Product"
                      />
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.category}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <div className="flex gap-4 items-center">
                        <Link
                          to={`/admin/updatecampaign/${data._id}`}
                          state={data}
                        >
                          <AiOutlineEdit
                            className="cursor-pointer text-secondary"
                            size={20}
                          />
                        </Link>
                        <AiOutlineDelete
                          onClick={() => handleCampaignDelete(data._id)}
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
    </>
  );
};

export default AllCampaigns;
