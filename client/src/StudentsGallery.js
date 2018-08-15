import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  Prompt,
  Switch
} from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import EditStudent from "./EditStudent";

class StudentsGallery extends Component {
  componentDidMount() {
    let allStudents = this.props.students;
    if (allStudents.length > 0) {
      allStudents = this.props.students;
    } else {
      fetch("/api/students")
        .then(res => res.json())
        .then(students => this.props.getStudents(students));
    }
  }
  render() {
    return (
      <div>
        <button>
          <NavLink exact activeStyle={{ color: "orange" }} to="/new-student">
            Add Student
          </NavLink>
        </button>
        <div>
          <ul>
            {this.props.students.map(student => (
              <Link key={student._id} to={"/students/" + student._id}>
                {student.editing ? (
                  <EditStudent student={student} key={student._id} />
                ) : (
                  <li>
                    <img width="200" src={student.src} />
                    <h1>
                      {student.firstName}
                      {student.lastName}
                    </h1>
                    <h2>{student.title}</h2>
                  </li>
                )}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { students: state };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudents: students =>
      dispatch({
        type: "GET_STUDENTS",
        students
      })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsGallery);
