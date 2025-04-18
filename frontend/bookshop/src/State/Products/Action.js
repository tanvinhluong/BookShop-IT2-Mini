import { API_BASE_URL, api, API_TOKEN, jwt } from "../../config/apiConfig";
import {
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_ID_FAILURE,
  FIND_PRODUCT_ID_REQUEST,
  FIND_PRODUCT_ID_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
} from "./ActionType";

// API TIM SAN PHAM
export const findProducts = (reqData) => async (dispatch) => {
  const { pageNumber, pageSize } = reqData;
  try {
    dispatch({ type: FIND_PRODUCTS_REQUEST });

    const { data } = await api.get(
      `${API_BASE_URL}/api/products?color=pageNumber=${pageNumber}&pageSize=${pageSize}`
    );

    console.log("get product by category - ", data);
    dispatch({
      type: FIND_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// API TIM SAN PHAM THEO ID
export const findProductsById = (reqData) => async (dispatch) => {
  try {
    dispatch({ type: FIND_PRODUCT_ID_REQUEST });

    // Lấy JWT từ localStorage
    const url = `${API_BASE_URL}/api/products/${reqData.productId}`;
    console.log("Fetching from:", url);

    // Cấu hình header với JWT
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    // Thực hiện yêu cầu GET
    const { data } = await api.get(url, config);

    console.log("Product details by ID:", data);
    dispatch({
      type: FIND_PRODUCT_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    console.error("Response:", error.response); // In ra phản hồi để debug
    dispatch({
      type: FIND_PRODUCT_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const { data } = await api.post(
      `${API_BASE_URL}/api/admin/products/`,
      product.data
    );

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });

    console.log("created product ", data);
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// API XOA SAN PHAM
export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await api.delete(`/api/admin/products/${productId}`);

    console.log("delete product :-", data);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
// API LAY RA TOAN BO SAN PHAM
export const getAllProducts = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCTS_REQUEST });
  try {
    const response = await api.get(`/api/products`);
    console.log("Products:", response.data);
    dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
  }
};
