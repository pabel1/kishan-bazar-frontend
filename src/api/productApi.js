import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../localstorage";

const baseUrl = process.env.REACT_APP_BASE_URL;

const logintoken = getToken();

// create single product
export const createProductAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/product/create/single`, data, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-type": "application/json;charset=UTF-8",
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }
};

// create products using csv File
export const uploadCSVProductsAPI = async (data, setLoading) => {
  if (logintoken) {
    try {
      return await axios.post(`${baseUrl}/api/v1/products/uploadfile`, data, {
        headers: {
          Authorization: `Bearer ${logintoken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }
};

// get all products
export const getAllProductsAPI = async () => {
  try {
    return await axios.get(`${baseUrl}/api/v1/product/all`);
  } catch (error) {
    console.log("Something Wrong");
  }
};
// get all products categories and subcategories
export const getAllCategoriesAndSubcategoriesAPI = async () => {
  try {
    return await axios.get(
      `${baseUrl}/api/v1/product/categories/subcategories`
    );
  } catch (error) {
    console.log("Something Wrong");
  }
};

export const getAllProductsPaginateAPI = async (page) => {
  if (logintoken) {
    try {
      return await axios.get(
        `${baseUrl}/api/v1/productpagination/all/${page}/${10}`
      );
    } catch (error) {
      console.log("Something Wrong");
    }
  }
};
// get all subcategories
export const getAllSubCategoriesAPI = async (category) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/getsubcategory/${category}`);
  } catch (error) {
    console.log("Something Wrong");
  }
};

// get all subcategories
export const getAlltheSubCategoriesProductAPI = async (
  category,
  subcategory,
  page,
  price,
  limit = 10
) => {
  try {
    return await axios.get(
      `${baseUrl}/api/v1/getproductsbycategorysorting/${page}/${limit}/${category}/${subcategory}/${price}`
    );
  } catch (error) {
    console.log("Something Wrong");
  }
};

// get single product
export const getSingleProductAPI = async (id) => {
  try {
    return await axios.get(`${baseUrl}/api/v1/product/${id}`);
  } catch (error) {
    console.log("Something Wrong");
  }
};
// update single product
export const updateProductAPI = async (data, id, setLoading) => {
  if (logintoken) {
    try {
      return await axios.put(`${baseUrl}/api/v1/product/update/${id}`, data, {
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

// delete a product
export const deleteProductAPI = async (id) => {
  if (logintoken) {
    try {
      return await axios.delete(`${baseUrl}/api/v1/product/delete/${id}`, {
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

// search products
export const getSearchProductsAPI = async (page = 1, limit = 10, search) => {
  try {
    return await axios.get(
      `${baseUrl}/api/v1/productbysearch/${page}/${limit}/${search}`
    );
  } catch (error) {
    console.log("Something Wrong");
  }
};
