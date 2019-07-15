import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import loader from "../assets/loader.gif";
import "../App.css";
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
      <div className="page">
        <div className="subhead">
          <NavLink exact to="/new-student">
            <i className="fas fa-3x fa-plus-circle" />
          </NavLink>
        </div>
        <div className="gallery">
          <ul>
            {this.props.students.map(student => (
              <Link key={student._id} to={"/students/" + student._id}>
                <li key={student._id} className="student-card">
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
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
StudentsGallery.propTypes = {
  students: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return { students: state };
};

export default connect(mapStateToProps)(StudentsGallery);
