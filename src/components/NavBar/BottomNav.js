import React, { useContext, useEffect, useRef, useState } from "react";
// import {Link} from 'react-router-dom'

import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { CiUser, CiSearch } from "react-icons/ci";
import { ImCross } from "react-icons/im";
// import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import CheckoutSlide from "../Checkout/CheckoutSlide";
import CheckoutCartSlideSmall from "../Checkout/CheckoutCartSlideSmall";
import logo from "../../assets/images/KrishanLogo.png";
import {
  CartContext,
  GlobalSearchContext,
  UserContext,
  WishListContext,
} from "../../context";
import { logoutAPI } from "../../api/userApi";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { toast } from "react-toastify";
import { getSearchProductsAPI } from "../../api/productApi";
import { removeToken } from "../../localstorage";

const BottomNav = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchRefMobile = useRef(null);
  const { searchVal } = useParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(searchVal || "");
  const [showLargeCart, setShowLargeCart] = useState(false);
  const [showSmallCart, setShowSmallCart] = useState(true);
  const { userState, setUserState } = useContext(UserContext);
  const { cartState, setCartState } = useContext(CartContext);
  const { wishListState, setWishListState } = useContext(WishListContext);
  const { setGlobalProducts } = useContext(GlobalSearchContext);

  const handleLogout = async () => {
    const res = await logoutAPI(); //api call
    if (res && res.status === 200) {
      setUserState((prev) => ({ isLogin: false, user: {} }));
      removeToken();
      toast.success(res.data.message);
      localStorage.setItem("cartProducts", JSON.stringify([]));
      setCartState([]);
      if (auth) {
        signOut(auth);
      }
      navigate("/login");
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (search) {
      const res = await getSearchProductsAPI(1, 10, search); //api call
      if (res && res.status === 200) {
        setGlobalProducts([...res.data.resData[0].products]);
        navigate(`/search/${e.target.value}`);
      }
    }
    if (e.target.value === "") {
      navigate("/");
    }
  };

  useEffect(() => {
    if (searchVal) {
      searchRef.current.focus();
      searchRefMobile.current.focus();
    }
  }, []);
  console.log(userState);
  return (
    <div className="bg-[#F7F5F3] transition-all duration-500 relative">
      <div className="hidden px-6 md:flex  items-center justify-between gap-4">
        <div>
          <Link to="/" className="flex items-end">
            <img className="w-28 py-1" src={logo} alt="logo" />
            <h4 className="text-[1.2rem] whitespace-pre font-semibold italic font-myfont text-secondary ml-[-1rem] mb-3">
              Krishan Bazar
            </h4>
          </Link>
        </div>
        <div className=" text-secondary flex items-center gap-4">
          <div
            className="lg:w-[30rem] flex items-center justify-between bg-white 
          rounded-md px-2 border border-secondary"
          >
            <input
              className=" w-[90%] outline-none bg-transparent py-[10px] px-3"
              type="text"
              placeholder="Search"
              value={search}
              ref={searchRef}
              onChange={handleSearch}
            />
            <CiSearch size={20} className="text-primaryColor cursor-pointer" />
          </div>
          <ul className="hidden  md:flex items-center  md:gap-2 lg:gap-5 text-sm lg:text-2xl ">
            {/* <li className=" hover:text-primaryColor transition-all duration-700">
              {" "}
              <Link className="flex item gap-1" to="/">
                <CiSearch size={30} />
              </Link>
            </li> */}
            <li className="relative hover:text-primaryColor transition-all duration-700">
              <Link className="flex item gap-1" to={`/wishlist`}>
                <AiOutlineHeart size={30} />
              </Link>
              {wishListState.length !== 0 && (
                <span className="w-6 h-6 flex justify-center items-center rounded-full absolute bg-red-500 bottom-[40%] left-[70%] text-white font-medium text-[0.8rem]">
                  {wishListState.length}
                </span>
              )}
            </li>
            <li
              className="flex items-center gap-2 text-sm text-left hover:text-primaryColor 
            transition-all duration-700"
            >
              <Link className="flex item gap-1  text-2xl" to="/myprofile">
                {userState?.user?.avatar || userState?.user?.avatarurl ? (
                  <img
                    className="w-10 h-10 rounded-full object-contain"
                    src={
                      userState?.user?.avatarurl || userState?.user?.avatar?.url
                    }
                    alt=""
                  />
                ) : (
                  <CiUser size={30} />
                )}
              </Link>
              {userState.user.name ? (
                <p
                  onClick={handleLogout}
                  className="cursor-pointer flex gap-1 font-semibold hover:text-primaryColor transition-all duration-700"
                >
                  Logout
                </p>
              ) : (
                <Link
                  className="flex item gap-1 font-semibold hover:text-primaryColor transition-all duration-700"
                  to="/login"
                >
                  Log in
                </Link>
              )}
            </li>
            <li className="relative hover:text-primaryColor transition-all duration-700 cursor-pointer">
              <AiOutlineShoppingCart
                onClick={() => {
                  setShowSmallCart(!showSmallCart);
                  setShowLargeCart(!showLargeCart);
                }}
                size={30}
              />
              {cartState.length !== 0 && (
                <span className="w-6 h-6 flex justify-center items-center rounded-full absolute bg-red-500 bottom-[40%] left-[90%] text-white font-medium text-[0.8rem]">
                  {cartState.length}
                </span>
              )}
              {showLargeCart && (
                <CheckoutSlide
                  showLargeCart={showLargeCart}
                  setShowLargeCart={setShowLargeCart}
                  showSmallCart={showSmallCart}
                  setShowSmallCart={setShowSmallCart}
                />
              )}
              {showSmallCart && (
                <CheckoutCartSlideSmall
                  showLargeCart={showLargeCart}
                  setShowLargeCart={setShowLargeCart}
                  showSmallCart={showSmallCart}
                  setShowSmallCart={setShowSmallCart}
                />
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* for mobile nav */}
      <div className=" relative md:hidden flex items-center justify-between px-6 text-secondary ">
        <div>
          <Link to="/">
            <img className="w-28" src={logo} alt="logo" />
          </Link>
        </div>

        <div>
          <button
            className="  text-xl text-active md:hidden "
            onClick={() => setOpen(!open)}
          >
            {open ? <ImCross /> : <AiOutlineMenu size={30} />}
          </button>
        </div>

        {/* <div>
          <div className="relative flex item gap-1">
            <AiOutlineShoppingCart
              size={30}
              onClick={() => {
                setShowSmallCart(!showSmallCart);
                setShowLargeCart(!showLargeCart);
              }}
            />
            {cartState && (
              <span className="w-6 h-6 flex justify-center items-center rounded-full absolute bg-red-500 bottom-[40%] left-[90%] text-white font-medium text-[0.8rem]">
                {cartState.length}
              </span>
            )}
            {showLargeCart && (
              <CheckoutSlide
                showLargeCart={showLargeCart}
                setShowLargeCart={setShowLargeCart}
                showSmallCart={showSmallCart}
                setShowSmallCart={setShowSmallCart}
              />
            )}
          </div>
        </div> */}

        {/* mobile menu */}

        <div
          className={` w-[70%] sm:w-[60%] bg-white drop-shadow-lg text-left  absolute top-[4.5rem] 
        right-0 px-4  py-1 ${
          open ? "block" : "hidden"
        } transition-all duration-1000`}
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            ref={searchRefMobile}
            onChange={handleSearch}
            className="my-3 w-[90%] bg-[#F7F5F3] px-4 py-3 rounded-lg outline-none"
          />
          <ul className="text-lg transition-all duration-1000 space-y-4  mt-4  px-5">
            <li className=" hover:text-primaryColor transition-all duration-700 pb-3 border-b-2">
              <Link
                className="flex justify-between"
                to={`${cartState.length !== 0 ? "/checkout" : "/"}`}
              >
                Cart
                <div className="relative flex item gap-1">
                  <AiOutlineShoppingCart
                    size={30}
                    onClick={() => {
                      setShowSmallCart(!showSmallCart);
                      setShowLargeCart(!showLargeCart);
                    }}
                  />
                  {cartState && (
                    <span className="w-6 h-6 flex justify-center items-center rounded-full absolute bg-red-500 bottom-5 left-5 text-white font-medium text-[0.8rem]">
                      {cartState.length}
                    </span>
                  )}
                  {showLargeCart && (
                    <CheckoutSlide
                      showLargeCart={showLargeCart}
                      setShowLargeCart={setShowLargeCart}
                      showSmallCart={showSmallCart}
                      setShowSmallCart={setShowSmallCart}
                    />
                  )}
                </div>
              </Link>
            </li>
            <li
              className=" hover:text-primaryColor transition-all duration-700
            pb-3 border-b-2"
            >
              <Link
                className=" flex justify-between"
                to={`${wishListState.length !== 0 ? "/wishlist" : "/"}`}
              >
                Wish List
                <span className="relative">
                  <AiOutlineHeart size={28} />
                  {wishListState.length !== 0 && (
                    <span className="w-6 h-6 flex justify-center items-center rounded-full absolute bg-red-500 bottom-5 left-4 text-white font-medium text-[0.8rem]">
                      {wishListState.length}
                    </span>
                  )}
                </span>
              </Link>
            </li>
            <li
              className=" hover:text-primaryColor transition-all duration-700
            pb-3 "
            >
              {userState.user.name ? (
                <p
                  onClick={handleLogout}
                  className="cursor-pointer flex justify-between"
                >
                  Logout
                  <span>
                    {(userState?.user?.avatar ||
                      userState?.user?.avatarurl) && (
                      <img
                        className="w-8 h-8 rounded-full object-contain"
                        src={
                          userState?.user?.avatarurl ||
                          userState?.user?.avatar?.url
                        }
                        alt=""
                      />
                    )}
                  </span>
                </p>
              ) : (
                <Link className="flex justify-between" to="/login">
                  Login
                  <span>
                    <CiUser size={20} />
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
