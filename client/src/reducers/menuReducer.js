import {
  GET_MENUS,
  POST_MENU,
  PUT_MENU,
  SHOW_LOADER,
  ERROR,
} from "../actions/actionTypes";

const initialState = {
  menus: [],
  loading: false,
  errorMsg: null,
  toast: false,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENUS:
      return {
        ...state,
        menus: action.payLoad,
        loading: false,
        errorMsg: null,
      };
    case POST_MENU:
      return {
        ...state,
        menus: [action.payLoad, ...state.menus],
        loading: false,
        errorMsg: null,
        toast: true,
      };
    case PUT_MENU:
      return {
        ...state,
        menus: [...action.payLoad],
        loading: false,
        errorMsg: null,
        toast: true,
      };
    case "TOGGLE_TOAST":
      return { ...state, toast: !state.toast, errorMsg: null };
    case SHOW_LOADER:
      return { ...state, loading: true, errorMsg: null };
    case ERROR:
      return { ...state, errorMsg: action.payLoad, loading: false };

    default:
      return { ...state };
  }
};

export default menuReducer;
