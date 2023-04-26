import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import CategoryLayout from "./components/Category/CategoryLayout";
import DynamicLayout from "./Pages/DynamicLayout";
import LoginForm from "./components/RegistationLogin/LoginForm";

import RegistationForm from "./components/RegistationLogin/RegistationForm";

import AboutUs from "./Pages/AboutUs";
import CategorisProduct from "./Pages/CategorisProduct";
import { CategoriesProductSidebar } from "./components/CategoryAndSubCategory/CategoriesProductSidebar";
import CheckOutPage from "./Pages/CheckOutPage";

import ContactUs from "./Pages/ContactUs";
import Home from "./Pages/Home";

import SubCategoryProduct from "./components/Category/SubCategoryProduct";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ProductPopUp from "./components/PopUpScreen/ProductPopUp";
import PopUpProductDetails from "./Pages/PopUpProductDetails";
import Wishlist from "./components/Wishlist/Wishlist";
import Admin from "./Pages/Admin";
import Dashboard from "./components/Admin/Dashboard";
import Createproduct from "./components/Admin/products/Createproduct";
import Createcampaign from "./components/Admin/campaign/Createcampaign";
import CreateClient from "./components/Admin/clientsays/CreateClient";
import AllUsers from "./components/Admin/users/AllUsers";
import UpdateProduct from "./components/Admin/products/UpdateProduct";
import UpdateRole from "./components/Admin/users/UpdateRole";
import AllCampaigns from "./components/Admin/campaign/AllCampaigns";
import Updatecampaign from "./components/Admin/campaign/Updatecampaign";
import Allclients from "./components/Admin/clientsays/Allclients";
import Updateclient from "./components/Admin/clientsays/Updateclient";
import AllProducts from "./components/Admin/products/AllProducts";
import {
  CartContext,
  GlobalSearchContext,
  OrderContext,
  PaymentInfoContext,
  ProductPopUpContex,
  ProductsContext,
  ShippingCost,
  ShippingInfoContext,
  UserContext,
  WishListContext,
} from "./context";
import ScrollToTop from "react-scroll-to-top";
import { useEffect, useState } from "react";
import CreateTeamMember from "./components/Admin/team/CreateTeamMember";
import AllteamMembers from "./components/Admin/team/AllteamMembers";
import UpdateTeam from "./components/Admin/team/UpdateTeam";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import MyProfile from "./components/Admin/users/MyProfile";
import Orderdetails from "./components/Order/Orderdetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCupon from "./components/Admin/cupon/CreateCupon";
import AllCoupons from "./components/Admin/cupon/AllCoupons";
import UpdateCoupon from "./components/Admin/cupon/UpdateCoupon";
import DiscountPage from "./Pages/DiscountPage";
import DiscountProducts from "./components/Discounts/DiscountProducts";

import CreateDiscountProduct from "./components/Admin/discounts/CreateDiscountProduct";
import AllDiscountProducts from "./components/Admin/discounts/AllDiscountProducts";
import UpdateDiscountProduct from "./components/Admin/discounts/UpdateDiscountProduct";
import DiscountCategory from "./components/Discounts/DiscountCategory";

import RefundPolicy from "./Pages/RefundPolicy";
import TermsCondition from "./Pages/TermsCondition";
import HelpSupport from "./Pages/HelpSupport";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import CreateAbout from "./components/Admin/aboutus/CreateAbout";
import AllAboutContent from "./components/Admin/aboutus/AllAboutContent";
import UpdateAbout from "./components/Admin/aboutus/UpdateAbout";
import OrderSuccess from "./components/Order/OrderSuccess";
import UpdateOrder from "./components/Admin/orders/UpdateOrder";
import SearchingProduct from "./Pages/SearchingProduct";
import Profile from "./Pages/Profile";
import { getMyProfileAPI } from "./api/userApi";
import AllOrders from "./components/Admin/orders/AllOrders";
import CreateShipping from "./components/Admin/shipping/CreateShipping";
import { getAllShippingCostAPI } from "./api/shippingApi";
import AllShipping from "./components/Admin/shipping/AllShipping";
import UpdateShipping from "./components/Admin/shipping/UpdateShipping";

function App() {
  // for search products
  const [globalProducts, setGlobalProducts] = useState([]);

  // for login users details
  const [userState, setUserState] = useState({
    isLogin: false,
    user: {},
  });

  // for products state
  const [productsState, setProductsState] = useState({
    isLoading: true,
    products: [],
  });

  // for cart state
  const [cartState, setCartState] = useState(
    JSON.parse(localStorage.getItem("cartProducts")) || []
  );

  // for cart state
  const [wishListState, setWishListState] = useState(
    JSON.parse(localStorage.getItem("wishListProducts")) || []
  );
  // for shipping info
  const [shippingInfo, setShippingInfo] = useState(
    JSON.parse(localStorage.getItem("shippingInfo")) || []
  );
  // for paymentInfo
  const [paymentInfo, setPaymentInfo] = useState(
    JSON.parse(localStorage.getItem("paymentInfo")) || {
      paymentMethod: "cashOnDelivery",
    }
  );
  // for order state
  const [orderState, setOrderState] = useState([]);

  const [shipping, setShipping] = useState({});

  const [productPopUpShow, setProductPopUpShow] = useState({
    show: false,
    data: {},
  });
  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      <ProductsContext.Provider value={{ productsState, setProductsState }}>
        <CartContext.Provider value={{ cartState, setCartState }}>
          <WishListContext.Provider value={{ wishListState, setWishListState }}>
            <ShippingInfoContext.Provider
              value={{ shippingInfo, setShippingInfo }}
            >
              <PaymentInfoContext.Provider
                value={{ paymentInfo, setPaymentInfo }}
              >
                <OrderContext.Provider value={{ orderState, setOrderState }}>
                  <ShippingCost.Provider value={{ shipping, setShipping }}>
                    <ProductPopUpContex.Provider
                      value={{ productPopUpShow, setProductPopUpShow }}
                    >
                      <GlobalSearchContext.Provider
                        value={{ globalProducts, setGlobalProducts }}
                      >
                        <ScrollToTop
                          smooth={true}
                          top={80}
                          viewBox="0 0 256 256"
                          color="#00A34D"
                          width="30"
                          height="20"
                          style={{
                            borderRadius: "50%",
                            fontSize: "2rem",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bolder",
                            border: "1px solid #00A34D",
                          }}
                        />
                        <ToastContainer />
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignUpPage />} />
                          <Route path="/aboutus" element={<AboutUs />} />
                          <Route
                            path="/search/:searchVal"
                            element={<SearchingProduct />}
                          />

                          <Route path="/contactus" element={<ContactUs />} />
                          <Route path="/discount" element={<DiscountPage />}>
                            <Route
                              path=":categoryname"
                              element={<DiscountCategory />}
                            />
                          </Route>
                          {/* privacy,terms,refund,help route */}
                          <Route
                            path="/refund"
                            element={<RefundPolicy />}
                          ></Route>
                          <Route
                            path="/terms"
                            element={<TermsCondition />}
                          ></Route>
                          <Route
                            path="/support"
                            element={<HelpSupport />}
                          ></Route>
                          <Route
                            path="/privacy"
                            element={<PrivacyPolicy />}
                          ></Route>

                          <Route
                            path="/products/:title"
                            element={<ProductPopUp />}
                          />

                          <Route path="/contactus" element={<ContactUs />} />
                          <Route
                            path="/forgotPassword"
                            element={<ForgotPassword />}
                          />
                          <Route
                            path="/api/v1/user/password/reset/:token"
                            element={<ResetPassword />}
                          />
                          <Route
                            path="/myprofile"
                            element={
                              userState.isLogin ? <MyProfile /> : <LoginPage />
                            }
                          />
                          <Route
                            path="/checkout"
                            element={
                              userState.isLogin ? (
                                <CheckOutPage />
                              ) : (
                                <LoginPage />
                              )
                            }
                          />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route
                            path="/orderdetails"
                            element={
                              userState.isLogin ? (
                                <Orderdetails />
                              ) : (
                                <LoginPage />
                              )
                            }
                          />
                          <Route
                            path="/ordersuccess"
                            element={
                              userState.isLogin ? (
                                <OrderSuccess />
                              ) : (
                                <LoginPage />
                              )
                            }
                          />

                          <Route path="categories" element={<DynamicLayout />}>
                            <Route
                              path=":categoryname"
                              element={<CategorisProduct />}
                            >
                              <Route
                                path=":subcategoryname"
                                element={<SubCategoryProduct />}
                              />
                            </Route>
                          </Route>

                          <Route
                            path="/admin"
                            element={
                              userState.isLogin &&
                              userState.user.userRole === "Admin" ? (
                                <Admin />
                              ) : (
                                <Home />
                              )
                            }
                          >
                            <Route path="" element={<Dashboard />} />
                            <Route
                              path="createproduct"
                              element={<Createproduct />}
                            />
                            <Route
                              path="allproducts"
                              element={<AllProducts />}
                            />
                            <Route
                              path="updateproduct/:id"
                              element={<UpdateProduct />}
                            />
                            <Route
                              path="createshipping"
                              element={<CreateShipping />}
                            />
                            <Route
                              path="allshipping"
                              element={<AllShipping />}
                            />
                            <Route
                              path="updateshipping/:id"
                              element={<UpdateShipping />}
                            />
                            <Route
                              path="creatediscountproduct"
                              element={<CreateDiscountProduct />}
                            />
                            <Route
                              path="alldiscountproducts"
                              element={<AllDiscountProducts />}
                            />
                            <Route
                              path="updatediscountproduct/:id"
                              element={<UpdateDiscountProduct />}
                            />
                            <Route
                              path="updateorder/:id"
                              element={<UpdateOrder />}
                            />
                            <Route
                              path="createcampaign"
                              element={<Createcampaign />}
                            />
                            <Route
                              path="allcampaigns"
                              element={<AllCampaigns />}
                            />
                            <Route
                              path="createcoupon"
                              element={<CreateCupon />}
                            />
                            <Route path="allcopons" element={<AllCoupons />} />
                            <Route
                              path="updatecoupon/:id"
                              element={<UpdateCoupon />}
                            />
                            <Route
                              path="updatecampaign/:id"
                              element={<Updatecampaign />}
                            />
                            <Route path="allusers" element={<AllUsers />} />
                            <Route
                              path="updaterole/:id"
                              element={<UpdateRole />}
                            />
                            <Route
                              path="createclient"
                              element={<CreateClient />}
                            />
                            <Route path="allclients" element={<Allclients />} />
                            <Route
                              path="updateclient/:id"
                              element={<Updateclient />}
                            />
                            <Route
                              path="createteammember"
                              element={<CreateTeamMember />}
                            />
                            <Route
                              path="allteammembers"
                              element={<AllteamMembers />}
                            />
                            <Route
                              path="updateteam/:id"
                              element={<UpdateTeam />}
                            />
                            <Route path="allorders" element={<AllOrders />} />
                            <Route
                              path="createabout"
                              element={<CreateAbout />}
                            />
                            <Route
                              path="allabouts"
                              element={<AllAboutContent />}
                            />
                            <Route
                              path="updateabout/:id"
                              element={<UpdateAbout />}
                            />
                          </Route>
                        </Routes>
                      </GlobalSearchContext.Provider>
                    </ProductPopUpContex.Provider>
                  </ShippingCost.Provider>
                </OrderContext.Provider>
              </PaymentInfoContext.Provider>
            </ShippingInfoContext.Provider>
          </WishListContext.Provider>
        </CartContext.Provider>
      </ProductsContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
