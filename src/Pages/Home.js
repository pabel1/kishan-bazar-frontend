import React, { useContext, useEffect, useState } from "react";
import { getAllProductsAPI } from "../api/productApi";
import { getMyProfileAPI } from "../api/userApi";

import Banner from "../components/Banner/Banner";
import BannerCaresoul from "../components/Banner/BannerCaresoul";
import Campaign from "../components/Campaign/Campaign";

import CategoryWiseProduct from "../components/Category/CategoryWiseProduct";

import Footer from "../components/Footer/Footer";

import NewArrival from "../components/NewArrival/NewArrival";
import PromotionalPopup from "../components/promotionalPopUp/PromotionalPopup";
import Testimonial from "../components/Testimonial/Testimonial";
import TotoalVisitor from "../components/TotalVisitor/TotoalVisitor";
import {
  OrderContext,
  ProductPopUpContex,
  ProductsContext,
  ShippingCost,
  UserContext,
} from "../context";
import CommonLayout from "./CommonLayout";
import Discount from "../components/Discounts/Discount";
import DiscountSlider from "../components/Discounts/DiscountSlider";
import { getAllOrdersAPI } from "../api/orderApi";
import { getAllShippingCostAPI } from "../api/shippingApi";
import ProductPopUp from "../components/PopUpScreen/ProductPopUp";

const Home = () => {
  const { productPopUpShow, setProductPopUpShow } =
    useContext(ProductPopUpContex);
  const { userState, setUserState } = useContext(UserContext);
  const { productsState, setProductsState } = useContext(ProductsContext);
  const { setOrderState } = useContext(OrderContext);
  const { setShipping } = useContext(ShippingCost);
  const [categoryData, setCategoryData] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  // show popup
  useEffect(() => {
    JSON.parse(sessionStorage.getItem("modal"))
      ? setShowPopUp(false)
      : setShowPopUp(true);
    sessionStorage.setItem("modal", JSON.stringify(true));
  }, []);

  // getting usesDetails
  useEffect(() => {
    const getProfile = async () => {
      const res = await getMyProfileAPI(); // api call
      if (res && res.status === 200) {
        setUserState({ ...userState, user: res.data.user, isLogin: true });
      }
    };
    getProfile();
  }, []);

  // getting all products
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await getAllProductsAPI(); //api call
      if (res && res.status === 200) {
        setProductsState({
          ...productsState,
          products: res.data.products,
          isLoading: false,
        });
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    setCategoryData([
      ...new Set(productsState.products.map((product) => product["category"])),
    ]);
  }, [productsState.products]);

  // getting all orders
  useEffect(() => {
    const getAllOrders = async () => {
      const res = await getAllOrdersAPI(); //api call
      if (res && res.status === 200) {
        setOrderState([...res.data.orders]);
      }
    };
    getAllOrders();
  }, []);

  // getting shipping cost details
  useEffect(() => {
    const getShipping = async () => {
      const res = await getAllShippingCostAPI(); // api call
      if (res && res.status === 200) {
        setShipping({
          ...res.data.shippingCost[res.data.shippingCost.length - 1],
        });
      }
    };
    getShipping();
  }, []);

  return (
    <>
      {/* popup */}
      <PromotionalPopup showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
      <ProductPopUp />
      <CommonLayout>
        <Banner />
        <BannerCaresoul />
        {/* <NewArrival productsData={productsState.products} /> */}
        {/* <Discount paginationLink={true} /> */}
        <DiscountSlider />
        {categoryData?.map((item, i) => (
          <CategoryWiseProduct
            products={productsState.products}
            category={item}
            key={i}
          />
        ))}

        {/* <Campaign /> */}
        <TotoalVisitor />
        <Testimonial />
        <Footer />
      </CommonLayout>
    </>
  );
};

export default Home;
