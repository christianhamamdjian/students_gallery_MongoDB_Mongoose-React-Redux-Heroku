import {
  GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  STUDENTS_LOADING
} from "../actions/types";
const initialState = {
  students: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENTS_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };

    case ADD_STUDENT:
      return { ...state, students: [...state.students, action.payload] };

    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(stud => {
          if (stud._id === action.payload._id) {
            return {
              ...stud,
              ...action.payload,
              _id: action.payload._id
            };
          } else return stud;
        })
      };

    case DELETE_STUDENT:
      return {
        ...state,
        students: state.students.filter(stud => stud._id !== action.payload)
      };

    default:
      return state;
  }
}
