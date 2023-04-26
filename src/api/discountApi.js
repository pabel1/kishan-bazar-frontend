import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create single product
export const createDiscountProductAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(
        `${baseUrl}/api/v1/discountproducts/create`,
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
      toast.error(error.response.data.message);
    }
  }
};
// create single product
export const uploadCSVDiscountsAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(
        `${baseUrl}/api/v1/discountproducts/uploadfile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${logintoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }
};

// create single product
export const getAllDiscountsAPI = async (data) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/discountproducts/all`);
  } catch (error) {
    console.log("Something Wrong");
  }
};

// create all products
export const getAllDiscountsPaginationAPI = async (currentPage) => {
  try {
    return await axios.get(
      `${baseUrl}/api/v1/discountproducts/all/${currentPage}/${10}`
    );
  } catch (error) {
    console.log("Something Wrong");
  }
};

// create single product
export const updateDiscountAPI = async (data, id, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(
        `${baseUrl}/api/v1/discountproducts/update/${id}`,
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
// create single product
export const deleteDiscountProductAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(
        `${baseUrl}/api/v1/discountproducts/delete/${id}`,
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

export const getAllDiscountCategoriesAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/discountproductscategory`);
  } catch (error) {
    console.log("Something Wrong");
  }
};

export const getAllDiscountCategoriesProductsAPI = async (
  categoryname = "All",
  price,
  page,
  limit = 10
) => {
  // let link = `${baseUrl}/api/v1/discountproductsbycategory/${page}/${limit}/${categoryname}/${price}`;

  try {
    return await axios.get(
      `${baseUrl}/api/v1/discountproductsbycategory/${page}/${limit}/${categoryname}/${price}`
    );
  } catch (error) {
    console.log("Something Wrong");
  }
};
