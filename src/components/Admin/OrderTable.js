import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteOrderAPI, getAllOrdersPaginateAPI } from "../../api/orderApi";
import Pagination from "react-js-pagination";
import { OrderContext } from "../../context";
import Swal from "sweetalert2";
import moment from "moment/moment";

const OrderTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { orderState } = useContext(OrderContext);
  const [orders, setOrders] = useState([]);
  const thData = ["OrderId", "Status", "CreatedAt", "Total Price", "Action"];

  const handleOrderDelete = async (id) => {
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
        const res = await deleteOrderAPI(id); // api call
        if (res && res.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          navigate("/admin");
        }
      }
    });
  };
  const handlePageChange = (event) => {
    setCurrentPage(event);
  };
  useEffect(() => {
    const getAllOrdersPaginate = async () => {
      const res = await getAllOrdersPaginateAPI(currentPage);
      if (res && res.status === 200) {
        setOrders([...res.data.orders]);
      }
    };
    getAllOrdersPaginate();
  }, [currentPage]);
  return (
    <>
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
            {orders &&
              orders.reverse().map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data?.orderId}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.orderStatus.toString().slice(0, 10)}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {moment(data.createdAt).format("lll")}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      &#2547; {data.paymentInfo.total}
                    </td>

                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <div className="flex gap-4 items-center">
                        <Link
                          to={`/admin/updateorder/${data._id}`}
                          state={data}
                        >
                          <AiOutlineEdit
                            className="cursor-pointer text-secondary"
                            size={20}
                          />
                        </Link>
                        <AiOutlineDelete
                          onClick={() => handleOrderDelete(data._id)}
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
            totalItemsCount={orderState.length}
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

export default OrderTable;
