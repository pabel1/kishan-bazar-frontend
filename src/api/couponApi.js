import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create a campaign
export const createCounponAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/cuponcode/create`, data, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      setLoading(false);
      console.log("Something Wrong");
    }
  }
};

// create a campaign
export const getAllCouponsAPI = async () => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/cuponcode/getall`, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};

// update a campaign
export const updateCouponAPI = async (id, data) => {
  if (logintoken) {
    try {
      return await axios.put(`${baseUrl}/api/v1/cuponcode/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};
// update a campaign
export const deleteCouponAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/cuponcode/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};

// find a coupon
export const checkCouponAPI = async (cupon) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/cuponcode/get/${cupon}`);
  } catch (error) {
    console.log("Something Wrong");
  }
};
