import { combineReducers } from "redux";
import menuReducer from "./menuReducer";

export default combineReducers({
  menus: menuReducer,
});
