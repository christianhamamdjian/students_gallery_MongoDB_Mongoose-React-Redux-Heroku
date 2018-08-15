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

class SingleStudent extends Component {
  handleDelete = e => {
    const removedId = this.props.myId;
    fetch(`/api/${removedId}`, {
      method: "delete"
    })
      .then(res => {
        console.log("this is res", res);
      })
      .catch(err => {
        console.log("my errors", err);
      });

    this.props.handleRemove(removedId);
    this.props.history.push("/");
  };
  render() {
    const selectedStudent = this.props.students.filter(
      student => student._id === this.props.myId
    )[0];

    return (
      <div>
        <NavLink to="/">Back to students gallery</NavLink>
        <Link key={this.props.myId} to={"/students/edit/" + this.props.myId}>
          <button>Edit Student</button>
        </Link>
        <button onClick={this.handleDelete}>Delete</button>
        <ul>
          <li>
            <img width="300" src={selectedStudent.src} />
            <h1>
              {selectedStudent.firstName}
              {selectedStudent.lastName}
            </h1>
            <h2>{selectedStudent.title}</h2>
            <p>{selectedStudent.nationality}</p>
            <p>{selectedStudent.skills}</p>
            <p>{selectedStudent.whySofterDeveloper}</p>
            <p>{selectedStudent.longTermVision}</p>
            <p>{selectedStudent.motivatesMe}</p>
            <p>{selectedStudent.favoriteQuote}</p>
            <p>{selectedStudent.joinedOn}</p>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    students: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRemove: removed => {
      dispatch({
        type: "DELETE_STUDENT",
        id: removed
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudent);
