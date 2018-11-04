import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export const reducer = (state = [], action) => {
  switch (action.type) {
    case "GET_STUDENTS":
      return [...state, ...action.students];

    case "ADD_STUDENT":
      return state.concat([action.payload]);

    case "DELETE_STUDENT":
      return state.filter(student => student._id !== action.id);

    case "UPDATE_STUDENT":
      return state.map(student => {
        if (student._id === action.payload._id) {
          return {
            ...student,
            ...action.payload,
            _id: action.payload._id
          };
        } else return student;
      });

    default:
      return state;
  }
};
export const rootReducer = combineReducers({
  myApp: reducer,
  form: formReducer
});
