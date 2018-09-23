import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

class StudentsGallery extends Component {
  render() {
    return (
      <div>
        <NavLink exact to="/new-student">
          <button className="buttongallery">Add Student</button>
        </NavLink>
        <div>
          <ul>
            {this.props.students.map(student => (
              <Link key={student._id} to={"/students/" + student._id}>
                <li>
                  <div className="image-container">
                    <img width="200" alt="" src={student.src} />
                  </div>
                  <h1>
                    <span>{student.firstName} </span>
                    <span>{student.lastName}</span>
                  </h1>
                  <h2>{student.title}</h2>
                </li>
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

export default connect(mapStateToProps)(StudentsGallery);
