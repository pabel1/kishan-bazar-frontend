import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { deleteUserAPI, getAllUsersAPI } from "../../../api/userApi";
import Swal from "sweetalert2";

const AllUsers = () => {
  const navigate = useNavigate();
  const [usersData, setusersData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const thData = ["Name", "Email", "Role", "Avatar", "Action"];
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event) => {
    setCurrentPage(event);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await getAllUsersAPI(currentPage); //api call
      if (res && res.status === 200) {
        setusersData([...res.data.users]);
        setTotalCount(res.data.totalCount);
      }
    };
    getAllUsers();
  }, [currentPage]);

  const handleUserDelete = async (id) => {
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
        const res = await deleteUserAPI(id); // api call
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
            {usersData &&
              usersData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.name}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.email}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.userRole}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <img
                        className="w-10 h-10 rounded-lg"
                        src={data.avatarurl || data.avatar.url}
                        alt="User"
                      />
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <div className="flex gap-4 items-center">
                        <Link to={`/admin/updaterole/${data._id}`} state={data}>
                          <AiOutlineEdit
                            className="cursor-pointer text-secondary"
                            size={20}
                          />
                        </Link>

                        <AiOutlineDelete
                          onClick={() => handleUserDelete(data._id)}
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
        {/* pagination */}
        <div className="pagination_box">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={10}
            pageRangeDisplayed={5}
            totalItemsCount={totalCount}
            onChange={handlePageChange}
            nextPageText="Next"
            prevPageText="Previous"
            firstPageText="First"
            lastPageText="Last"
            itemClass="border border-secondary  mx-1 rounded-full px-2"
            linkClass="text-secondary text-sm"
            activeClass="bg-secondary"
            activeLinkClass="text-bgColor"
          />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
