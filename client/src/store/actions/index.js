import {
  GET_STUDENTS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from "./types";

export const getStudents = () => async dispatch => {
  try {
    const res = await fetch("/api/students");
    const json = await res.json().then(students =>
      dispatch({
        type: GET_STUDENTS,
        students
      })
    );

    return json;
  } catch (err) {
    alert(err);
  }
};

export const newStudent = (formData, history) => async dispatch => {
  document.getElementById("waiting").style.display = "block";
  console.log(formData);
  try {
    const res = await fetch("/api/newstudent", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    });
    const json = await res.json().then(payload => {
      dispatch({
        type: ADD_STUDENT,
        payload
      });
      setTimeout(function() {
        alert("Your information has been added!");
      }, 500);
      history.push("/");
    });
    return json;
  } catch (err) {
    alert(err);
  }
};

export const updateStudent = (formData, _id, history) => async dispatch => {
  document.getElementById("waiting-update").style.display = "block";
  try {
    const res = await fetch(
      ` /api/update/${_id}
		`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json"
        },
        body: formData
      }
    );
    const json = await res.json().then(payload => {
      dispatch({
        type: UPDATE_STUDENT,
        payload
      });
      setTimeout(function() {
        alert("Your information has been updated!");
      }, 500);
      history.push("/");
    });
    return json;
  } catch (err) {
    alert(err);
  }
};

export const deleteStudent = (removedId, history) => dispatch => {
  const removed = removedId;
  fetch(
    ` /api/${removedId}
	`,
    {
      method: "delete"
    }
  )
    .then(res => {
      dispatch({
        type: DELETE_STUDENT,
        id: removed
      });
      setTimeout(function() {
        alert("Your information has been deleted!");
      }, 500);
      history.push("/");
    })
    .catch(err => {
      alert(err);
    });
};
