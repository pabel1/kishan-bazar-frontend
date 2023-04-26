import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create a campaign
export const createShippingCostAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/shippingcost/create`, data, {
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
//get all shipping const
export const getAllShippingCostAPI = async () => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/shippingcost/getall`, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
        },
      });
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};

//update  a shipping cost
export const updateShippingCostAPI = async (id, data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/shippingcost/update/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );
    } catch (error) {
      setLoading(false);
      console.log("Something Wrong");
    }
  }
};

//update  a shipping cost
export const deleteShippingAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/shippingcost/delete/${id}`, {
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
