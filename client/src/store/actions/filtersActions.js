/*
 * filters actions
 */
import {
  SEARCH_RESULT,
  PREVIOUS_PAGE,
  NEXT_PAGE,
  SORT_BY_FIRST_NAME,
  SORT_BY_LAST_NAME
} from "./types";
// Search students
export const searchResult = (input, students) => {
  return {
    type: SEARCH_RESULT,
    payload: { input, students }
  };
};
// Pagination
export const previousPage = payload => {
  return {
    type: PREVIOUS_PAGE,
    payload: payload
  };
};

export const nextPage = payload => {
  return {
    type: NEXT_PAGE,
    payload: payload
  };
};

// Sorting
export const sortByFirstName = (students, filteredlist) => {
  return {
    type: SORT_BY_FIRST_NAME,
    payload: { students, filteredlist }
  };
};

export const sortByLastName = (students, filteredlist) => {
  return {
    type: SORT_BY_LAST_NAME,
    payload: { students, filteredlist }
  };
};
