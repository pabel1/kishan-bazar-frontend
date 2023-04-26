import React from "react";
import OrderTable from "../OrderTable";

const AllOrders = () => {
  return (
    <div className="w-full h-[40%] mt-4">
      <h3 className="font-semibold text-textColor mb-2">All Orders</h3>
      <OrderTable />
    </div>
  );
};

export default AllOrders;
