import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// signup user
export const signUpAPI = async (data) => {
  try {
    return await axios.post(`${baseUrl}/api/v1/signup`, data);
  } catch (error) {
    console.log("Something Wrong");
  }
};

// login user
export const loginAPI = async (data) => {
  try {
    return await axios.post(`${baseUrl}/api/v1/login`, data);
  } catch (error) {
    console.log("Something Wrong");
  }
};

// myprofile
export const getMyProfileAPI = async () => {
  if (logintoken) {
    try {
      return await axios.get(`${baseUrl}/api/v1/myprofile`, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
        },
      });
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};

// logout
export const logoutAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/logout`);
  } catch (error) {
    console.log("Something Wrong");
  }
};

// all users
export const getAllUsersAPI = async (currentPage) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/allusers/${currentPage}/${10}`, {
      headers: {
        Authorization: `Bearer ${logintoken}`,
        "Content-type": "application/json;charset=UTF-8",
      },
    });
  } catch (error) {
    console.log("Something Wrong");
  }
};

// update user Role
export const updateRoleAPI = async (id, userRole) => {
  try {
    return await axios.put(
      `${baseUrl}/api/v1//updaterole/${id}`,
      { userRole },
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
};

// delete a user
export const deleteUserAPI = async (id) => {
  try {
    return await axios.delete(`${baseUrl}/api/v1/deleteuser/${id}`, {
      headers: {
        Authorization: `Bearer ${logintoken}`,
        "Content-type": "application/json;charset=UTF-8",
      },
    });
  } catch (error) {
    console.log("Something Wrong");
  }
};

// forgot password
export const sendEmailAPI = async (email) => {
  try {
    return await axios.post(`${baseUrl}/api/v1/forgot/password`, { email });
  } catch (error) {
    console.log("Something Wrong");
  }
};

// reset password
export const resetPasswordAPI = async (state, token) => {
  try {
    return await axios.post(
      `${baseUrl}/api/v1/user/password/reset/${token}`,
      state
    );
  } catch (error) {
    console.log("Something Wrong");
  }
};

// update profile
export const updateUserAPI = async (state, base64) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/update/myprofile`,
        {
          ...state,
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
      console.log("Something Wrong");
    }
  }
};
// update password
export const updatePasswordAPI = async (state) => {
  if (logintoken) {
    try {
      return await axios.put(`${baseUrl}/api/v1/update/mypassword`, state, {
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
