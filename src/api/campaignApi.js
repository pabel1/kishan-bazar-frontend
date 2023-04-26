import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create a campaign
export const createCampaignAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/campaign/create`, data, {
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

// get all products
export const getAllCampaignsAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/campaign/all`);
  } catch (error) {
    console.log("Something Wrong");
  }
};

// update a campaign
export const updateCampaignAPI = async (data, base64, id, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/update/${id}`,
        {
          ...data,
          base64,
        },
        {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );
    } catch (error) {
      setLoading(false)
      console.log("Something Wrong");
    }
  }
};

// get all products
export const deleteCampaignsAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/delete/${id}`, {
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
