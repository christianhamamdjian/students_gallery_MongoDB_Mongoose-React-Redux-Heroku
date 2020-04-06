/*
 * filters reducers
 */
import {
  SEARCH_RESULT,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  SORT_BY_FIRST_NAME,
  SORT_BY_LAST_NAME
} from "../actions/types";
const initialState = {
  filteredlist: [],
  currentPage: 0,
  itemsPerPage: 3,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Search
    case SEARCH_RESULT:
      if (!action.payload.input) {
        return {
          ...state,
          // students: action.students,
          filteredlist: [],
          currentPage: 0
        };
      } else {
        return {
          ...state,
          filteredlist: action.payload.students.filter(stud =>
            stud.firstName
              .toLowerCase()
              .includes(action.payload.input.trim().toLowerCase())
          ),
          currentPage: 0
        };
      }

    // Pagination
    case PREVIOUS_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    default:
      return state;
  }
}
