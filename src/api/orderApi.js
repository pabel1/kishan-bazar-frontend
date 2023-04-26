import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create a order
export const createOrderAPI = async (data) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/order/new`, data, {
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

// get  all order
export const getAllOrdersAPI = async () => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/order/all`, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
        },
      });
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};

// get  all order
export const getAllOrdersPaginateAPI = async (page, limit) => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/order/all/${page}/${limit}`, {
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

// get  single order
export const getSingleOrderDetailsAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/order/${id}`, {
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

// get  single order
export const updateOrderStatusAPI = async (id, status) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/order/updatestatus/${id}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};

// delete  single order
export const deleteOrderAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/order/delete/${id}`, {
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

// get my orders
export const getMyOrdersAPI = async () => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/order/my`, {
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
