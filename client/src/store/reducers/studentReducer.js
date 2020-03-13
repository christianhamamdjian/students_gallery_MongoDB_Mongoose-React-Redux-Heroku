import {
  GET_STUDENTS,
  ADD_STUDENT,
  DELETE_STUDENT,
  UPDATE_STUDENT,
  STUDENTS_LOADING,
  SEARCH_RESULT,
  PREVIOUS_PAGE,
  NEXT_PAGE
} from "../actions/types";
const initialState = {
  students: [],
  filteredlist: [],
  currentPage: 0,
  itemsPerPage: 3,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SEARCH_RESULT:
      if (!action.payload) {
        return {
          ...state,
          students: state.students,
          filteredlist: [],
          currentPage: 0
        };
      } else {
        return {
          ...state,
          filteredlist: state.students.filter(stud =>
            stud.firstName
              .toLowerCase()
              .includes(action.payload.trim().toLowerCase())
          ),
          currentPage: 0
        };
      }
    case PREVIOUS_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

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
