import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
const token = localStorage.getItem("jwt");

const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user, message) => ({
  type: REGISTER_SUCCESS,
  payload: { user, message },
});

const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    dispatch(registerSuccess(user, response.data.message));
    window.location.reload();
    // if (user.jwt) {
    //   localStorage.setItem("jwt", user.jwt);
    // }
    console.log("user :", user);
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user, message) => ({
  type: LOGIN_SUCCESS,
  payload: { user, message },
});
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (!user.jwt) {
      alert("Sai tài khoản hoặc mật khẩu");
      return;
    }

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    console.log("Login response:", response); // Log response here
    dispatch(loginSuccess(user.jwt, response.data.message));
    window.location.reload();
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const adminLogin = (userData) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    if (!user.jwt) {
      alert("Sai tài khoản hoặc mật khẩu");
      return;
    }

    if (user.jwt) {
      localStorage.setItem("adminjwt", user.jwt);
    }
    console.log("Login response:", response);
    dispatch(loginSuccess(user.jwt, response.data.message));
    window.location.reload();
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    const role = user.roles.map((role) => role.name);
    const permission = user.permissions.map(
      (permissions) => permissions.permissionName
    );
    console.log("user :", user);

    localStorage.setItem("roles", role);
    localStorage.setItem("permissions", permission);

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const getAdmin = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());

  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    const role = user.roles.map((role) => role.name);
    const permission = user.permissions.map(
      (permissions) => permissions.permissionName
    );
    console.log("user :", user);

    localStorage.setItem("adminroles", role);
    localStorage.setItem("adminpermissions", permission);

    dispatch(getUserSuccess(user));
  } catch (error) {
    dispatch(getUserFailure(error.message));
  }
};

export const logout = (userType) => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });

    if (userType === "admin") {
      localStorage.removeItem("adminjwt");
      localStorage.removeItem("adminroles");
      localStorage.removeItem("adminpermissions");
    } else {
      localStorage.clear();
    }
  };
};

