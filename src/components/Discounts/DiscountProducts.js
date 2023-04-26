import React, { useEffect, useState } from "react";
import { getAllDiscountsAPI } from "../../api/discountApi";
import DiscountProductCard from "../Product/DiscountProductCard";

const DiscountProducts = () => {
  const [discountsData, setDiscountsData] = useState([]);
  // getting all discounts
  useEffect(() => {
    const getAllDiscounts = async () => {
      const res = await getAllDiscountsAPI(); //api call
      if (res && res.status === 200) {
        setDiscountsData([...discountsData, ...res.data.products]);
      }
    };
    getAllDiscounts();
  }, []);
  return discountsData.map((item, index) => (
    <DiscountProductCard data={item} key={index} />
  ));
};

export default DiscountProducts;
