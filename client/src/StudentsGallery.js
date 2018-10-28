import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import loader from "./loader.gif";
import "./App.css";
import { connect } from "react-redux";

class StudentsGallery extends Component {
  render() {
    if (this.props.students.length <= 0) {
      return (
        <div id="loader">
          <img src={loader} alt="loader" />
          <h2>Waiting for server spin up ...</h2>
        </div>
      );
    }
    return (
      <div>
        <NavLink exact to="/new-student">
          <i className="fas fa-3x fa-plus-circle" />
        </NavLink>
        <div>
          <ul>
            {this.props.students.map(student => (
              <li className="student-card">
                <div className="image-container">
                  <img alt="" src={student.src} />
                </div>
                <div className="info-container">
                  <div className="info-container-text">
                    <h2 className="name">
                      <span>{student.firstName} </span>
                      <span>{student.lastName}</span>
                    </h2>
                    <h3 className="title">{student.title}</h3>
                  </div>
                  <Link key={student._id} to={"/students/" + student._id}>
                    <i className="fa fa-lg fa-info-circle" aria-hidden="true" />
                  </Link>
                </div>
              </li>
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

export default connect(mapStateToProps)(StudentsGallery);
