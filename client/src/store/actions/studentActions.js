import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_STUDENTS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
  STUDENTS_LOADING,
  SEARCH_RESULT,
  PREVIOUS_PAGE,
  NEXT_PAGE
} from "./types";

// Search students
export const searchResult = payload => {
  return {
    type: SEARCH_RESULT,
    payload: payload
  };
};
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
// Get Posts
export const getStudents = () => dispatch => {
  dispatch(setStudentsLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENTS,
        payload: null
      })
    );
};

// Add Student
export const newStudent = formData => dispatch => {
  dispatch(clearErrors());
  let axiosConfig = {
    headers: {
      Accept: "application/json"
    }
  };
  // console.log(formData);
  axios
    .post("/api/newstudent", formData, axiosConfig)
    .then(res => {
      dispatch({
        type: ADD_STUDENT,
        payload: res.data
      });
    })
    .then(res =>
      setTimeout(function() {
        alert("Your information has been added!");
      }, 500)
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      alert("An error has occurred please try again later!");
    });
};

// Update Student
export const updateStudent = (formData, _id) => dispatch => {
  dispatch(clearErrors());
  let axiosConfig = {
    headers: {
      Accept: "application/json"
    }
  };
  // console.log(formData);
  axios
    .put(`/api/update/${_id}`, formData, axiosConfig)
    .then(res => {
      dispatch({
        type: UPDATE_STUDENT,
        payload: res.data
      });
    })
    .then(res =>
      setTimeout(function() {
        alert("Your information has been updated!");
      }, 500)
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      alert("An error has occurred please try again later!");
    });
};

// Delete Student
export const deleteStudent = id => dispatch => {
  axios
    .delete(`/api/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_STUDENT,
        payload: id
      })
    )
    .then(res =>
      setTimeout(function() {
        alert("Your information has been deleted!");
      }, 500)
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      alert("An error has occurred please try again later!");
    });
};

// Set loading state
export const setStudentsLoading = () => {
  return {
    type: STUDENTS_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
