import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

export const createAboutAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/aboutus/create`, data, {
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
export const getAllAboutsAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/aboutus/all`);
  } catch (error) {
    console.log("Something Wrong");
  }
};
export const updateAboutAPI = async (data, id, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(`${baseUrl}/api/v1/aboutus/update/${id}`, data, {
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
export const deleteAboutAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/aboutus/delete/${id}`, {
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
