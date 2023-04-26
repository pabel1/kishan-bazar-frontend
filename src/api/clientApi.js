import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create a client
export const createClientAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/clientsays/create`, data, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      setLoading(false);
      console.log('Something Wrong');
    }
  }
};

// gets all client
export const getAllClientsAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/clientsays/all`);
  } catch (error) {
    console.log('Something Wrong');
  }
};

//delete a client
export const deleteClientAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/clientsays/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      console.log('Something Wrong');
    }
  }
};
//delete a client
export const updateClientAPI = async (data, base64, id, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/clientsays/update/${id}`,
        {
          base64,
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-type": "application/json;charset=UTF-8",
          },
        }
      );
    } catch (error) {
      setLoading(false);
      console.log('Something Wrong');
    }
  }
};
