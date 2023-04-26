import React, { useContext, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import {
  deleteProductAPI,
  getAllProductsPaginateAPI,
} from "../../api/productApi";
import { ProductsContext } from "../../context";
import Swal from "sweetalert2";

const ProductTable = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { productsState } = useContext(ProductsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event) => {
    setCurrentPage(event);
  };

  const thData = ["ProductId", "Name", "Image", "Action"];
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

  useEffect(() => {
    const getAllProductsPaginate = async () => {
      const res = await getAllProductsPaginateAPI(currentPage);
      if (res && res.status === 200) {
        setProducts([...res.data.products]);
      }
    };
    getAllProductsPaginate();
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
            {products &&
              products.map((data, index) => {
                return (
                  <tr key={index}>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.productId}
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      {data.productname.toString().slice(0, 10)}...
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
                      <img
                        className="w-10 h-10 rounded-lg"
                        src={data.image}
                        alt="Product"
                      />
                    </td>
                    <td className="text-sm w-fit px-[0.8rem] py-[1rem] gap-x-0 text-textColor text-left">
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

        {/* pagination */}
        <div className="pagination_box">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={10}
            pageRangeDisplayed={5}
            totalItemsCount={productsState.products.length}
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

export default ProductTable;
