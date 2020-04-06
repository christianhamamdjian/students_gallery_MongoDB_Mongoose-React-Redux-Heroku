import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import filtersReducer from "./filtersReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  student: studentReducer,
  filters: filtersReducer,
  error: errorReducer,
  auth: authReducer
});
