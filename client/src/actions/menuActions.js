import axios from "axios";
import { axiosConfig } from "./axiosConfig";
import {
  SHOW_LOADER,
  GET_MENUS,
  POST_MENU,
  PUT_MENU,
  ERROR,
} from "./actionTypes";

export const toggleToast = () => {
  return {
    type: "TOGGLE_TOAST",
  };
};

const DEFAULT_ERROR_MSG = "Something went wrong. Please try after sometime.";
export const getMenus = () => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  axios
    .get("/api/v1/menu")
    .then((res) => {
      if (res?.data?.success === true) {
        dispatch({ type: GET_MENUS, payLoad: res?.data?.menus });
      } else {
        dispatch({
          type: ERROR,
          payLoad: res?.data?.message || DEFAULT_ERROR_MSG,
        });
      }
    })
    .catch((e) =>
      dispatch({
        type: ERROR,
        payLoad:
          e?.response?.data?.message ||
          "Error in connecting to database. Please contact administrator.",
      })
    );
};

export const postMenu = (payload) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  const newItem = { ...payload };
  axios
    .post("/api/v1/menu", newItem, axiosConfig.headers)
    .then((res) => {
      if (res?.data?.success === true) {
        dispatch({
          type: POST_MENU,
          payLoad: res?.data?.menu,
        });
      } else {
        dispatch({
          type: ERROR,
          payLoad: res?.data?.message || DEFAULT_ERROR_MSG,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: ERROR,
        payLoad:
          e?.response?.data?.message ||
          "Error in connecting to database. Please contact administrator.",
      });
    });
};

export const putMenu = (id, payload, menus) => (dispatch) => {
  dispatch({ type: SHOW_LOADER });
  // const newItem = { ...payload };
  axios
    .put(`/api/v1/menu/${id}`, payload, axiosConfig.headers)
    .then((res) => {
      if (res?.data?.success === true) {
        const newMenu = [...menus];
        const index = menus?.findIndex((obj, index) => {
          if (obj.id === id) {
            return true;
          }
          return false;
        });
        newMenu[index] = res?.data?.menu;
        dispatch({
          type: PUT_MENU,
          payLoad: newMenu,
        });
      } else {
        dispatch({
          type: ERROR,
          payLoad: res?.data?.message || DEFAULT_ERROR_MSG,
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: ERROR,
        payLoad:
          e?.response?.data?.message ||
          "Error in connecting to database. Please contact administrator.",
      });
    });
};
