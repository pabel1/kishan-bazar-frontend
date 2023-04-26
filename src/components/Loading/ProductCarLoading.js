import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductCarLoading = () => {
  return (
    <div className="">
     
            <div>
              <Skeleton count={1} height={200}></Skeleton>
            </div>

            <div>
              <Skeleton count={3} height={30}></Skeleton>
              {/* <Skeleton count={1} height={30}></Skeleton>
              <Skeleton count={1} height={30}></Skeleton> */}
            </div>
          
       
    </div>
  );
};

export default ProductCarLoading;
