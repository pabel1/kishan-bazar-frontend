import React, { useContext, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { deleteOrderAPI } from "../../api/orderApi";
import { deleteProductAPI } from "../../api/productApi";
import { OrderContext, ProductsContext } from "../../context";
import Cards from "./Cards";

const Dashboard = () => {
  const navigate = useNavigate();
  const { orderState } = useContext(OrderContext);
  const { productsState } = useContext(ProductsContext);
  const thData = ["ProductId", "Name", "Image", "Action"];
  const th2Data = ["OrderId", "Status", "CreatedAt", "Total Price", "Action"];
  const handleProductDelete = async (id) => {
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
        const res = await deleteProductAPI(id); // api call
        if (res && res.status === 200) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          navigate("/admin");
        }
      }
    });
  };
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
  return (
    <>
      {/* <div className="mt-6 md:mt-0 relative w-full h-[30%]">
        <Cards/>
      </div> */}
      <div className="w-[90%] mx-auto md:w-full h-[40%]">
        <h3 className="font-semibold text-textColor mb-2">Recent Orders</h3>
        <div className="w-full h-full overflow-x-auto border border-gray-400 rounded-[1rem]">
          <table className=" bg-bgColor  whitespace-nowrap w-full h-full p-[4rem] border-collapse">
            <thead>
              <tr>
                {th2Data?.map((item, index) => (
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
              {orderState &&
                orderState?.slice(0, 3)?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.orderId}
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.orderStatus.toString().slice(0, 10)}
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {new Date(data.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        &#2547; {data.paymentInfo.total}
                      </td>

                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
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
        </div>
      </div>
      <div className="w-[90%] mx-auto md:w-full h-[40%] mt-4">
        <h3 className="font-semibold text-textColor mb-2">Recent Products</h3>
        <div className="w-full h-full overflow-x-auto border border-gray-400 rounded-[1rem]">
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
              {productsState?.products &&
                productsState?.products?.slice(0, 3)?.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.productId}
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        {data.productname.toString().slice(0, 10)}...
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        <img
                          className="w-10 h-10 rounded-lg"
                          src={data.image}
                          alt="Product"
                        />
                      </td>
                      <td className="text-[1rem] w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                        <div className="flex gap-4 items-center">
                          <Link
                            to={`/admin/updateproduct/${data._id}`}
                            state={data}
                          >
                            <AiOutlineEdit
                              className="cursor-pointer text-secondary"
                              size={20}
                            />
                          </Link>
                          <AiOutlineDelete
                            onClick={() => handleProductDelete(data._id)}
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

export default Dashboard;
