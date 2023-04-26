import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create a client
export const createTeamAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/teammember/create`, data, {
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

// create a client
export const getAllTeamAPI = async (data) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/teammember/all`, data);
  } catch (error) {
    console.log('Something Wrong');
  }
};

// update a team member
export const updateTeamAPI = async (base64, data, id, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/teammember/update/${id}`,
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

export const deleteTeamAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/teammember/delete/${id}`, {
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
