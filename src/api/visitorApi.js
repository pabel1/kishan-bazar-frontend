import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const setTotalVisitorAPI = async () => {
  try {
    return await axios.post(`${baseUrl}/api/v1/visitor/create`, { visitor: 1 });
  } catch (error) {
    console.log("Something Wrong");
  }
};

export const getTotalVisitorAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/visitor/all`);
  } catch (error) {
    console.log("Something Wrong");
  }
};
