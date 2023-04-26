import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteClientAPI, getAllClientsAPI } from "../../../api/clientApi";
import { deleteTeamAPI, getAllTeamAPI } from "../../../api/teamApi";

const AllteamMembers = () => {
  const navigate = useNavigate();
  const [teamsData, setTeamsData] = useState([]);
  const thData = ["Name", "Designation", "Description", "Avatar", "Action"];

  useEffect(() => {
    const getAllTeams = async () => {
      const res = await getAllTeamAPI(); //api call
      if (res && res.status === 200) {
        setTeamsData([...res.data.teams]);
      }
    };
    getAllTeams();
  }, []);

  const handleMemberDelete = async (id) => {
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
        const res = await deleteTeamAPI(id); // api call
        if (res && res.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          navigate("/admin/allteammembers");
        }
      }
    });
  };
  return (
    <>
      <div className="w-full h-full overflow-x-auto border border-gray-400 rounded-lg">
        <table className=" bg-bgColor  whitespace-nowrap w-full h-full p-[4rem] border-collapse">
          {" "}
          <thead>
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
            {teamsData &&
              teamsData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.name}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.designation}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.description.slice(0, 30)}...
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <img
                        className="w-10 h-10 rounded-lg"
                        src={data.image.url}
                        alt="Client"
                      />
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <div className="flex gap-4 items-center">
                        <Link to={`/admin/updateteam/${data._id}`} state={data}>
                          <AiOutlineEdit
                            className="cursor-pointer text-secondary"
                            size={20}
                          />
                        </Link>

                        <AiOutlineDelete
                          onClick={() => handleMemberDelete(data._id)}
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

export default AllteamMembers;
