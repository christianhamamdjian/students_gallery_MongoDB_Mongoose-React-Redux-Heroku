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
        <br />
        <button className="buttondelete" onClick={this.handleDelete}>
          Delete
        </button>
        <NavLink to="/">
          <strong> Back to students gallery</strong>
        </NavLink>
        <Link key={this.props.myId} to={"/students/edit/" + this.props.myId}>
          <button className="button">Edit Student</button>
        </Link>

        <ul>
          <li>
            <img width="300" src={selectedStudent.src} />
            <h1>
              <span>{selectedStudent.firstName} </span>
              <span>{selectedStudent.lastName}</span>
            </h1>
            <h2>{selectedStudent.title}</h2>
            <p>
              <strong>Nationality: </strong>
              {selectedStudent.nationality}
            </p>
            <p>
              <strong>Skills: </strong>
              {selectedStudent.skills}
            </p>
            <p>
              <strong>Why a software developer: </strong>
              {selectedStudent.whySofterDeveloper}
            </p>
            <p>
              <strong>Long term vision: </strong>
              {selectedStudent.longTermVision}
            </p>
            <p>
              <strong>What motivates me: </strong>
              {selectedStudent.motivatesMe}
            </p>
            <p>
              <strong>Favorite quote: </strong>
              {selectedStudent.favoriteQuote}
            </p>
            <p>
              <strong>Joined on: </strong>
              {selectedStudent.joinedOn}
            </p>
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
