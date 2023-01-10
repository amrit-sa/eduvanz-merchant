import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import model from "./model";
import payment from "./payment";

export default combineReducers({
  auth,
  user,
  message,
  model,
  payment,
});
