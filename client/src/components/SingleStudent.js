import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import loader from "../assets/loader.gif";
import "../App.css";
import { connect } from "react-redux";
import { deleteStudent } from "../store/actions";

class SingleStudent extends Component {
  handleDelete = e => {
    const removedId = this.props.myId;
    const history = this.props.history;
    this.props.deleteStudent(removedId, history);
  };

  render() {
    const selectedStudent = this.props.students.filter(
      student => student._id === this.props.myId
    )[0];
    if (!selectedStudent) return <img src={loader} alt="loader" />;
    return (
      <div>
        <div className="subhead">
          <div className="student-nav">
            <Link
              key={this.props.myId}
              to={"/students/edit/" + this.props.myId}
            >
              <i className="fa fa-2x fa-edit" />
            </Link>
            <i
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                )
                  this.handleDelete();
              }}
              className="fa fa-2x fa-trash"
            />
            <NavLink to="/">
              <i className="fas fa-2x fa-angle-double-left" />
            </NavLink>
          </div>
        </div>
        <div className="student-info">
          <div className="student-info-img">
            <img width="300" alt="" src={selectedStudent.src} />
          </div>
          <div className="student-info-text">
            <h2>
              <span>{selectedStudent.firstName} </span>
              <span>{selectedStudent.lastName}</span>
            </h2>
            <h3>{selectedStudent.title}</h3>
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
          </div>
        </div>
      </div>
    );
  }
}
SingleStudent.propTypes = {
  myId: PropTypes.string,
  handleDelete: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    students: state
  };
};

export default connect(
  mapStateToProps,
  { deleteStudent }
)(SingleStudent);
