import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import * as utils from "../utils";
import { updateStudent } from "../store/actions";

class EditStudent extends Component {
  constructor(props) {
    super(props);

    const selectedStudent =
      props.students.find(student => student._id === props.myId) || {};

    this.state = {
      photo: "",
      src: selectedStudent.src || "",
      alt: selectedStudent.alt || "",
      firstName: selectedStudent.firstName || "",
      lastName: selectedStudent.lastName || "",
      title: selectedStudent.title || "",
      nationality: selectedStudent.nationality || "",
      skills: selectedStudent.skills || "",
      whySofterDeveloper: selectedStudent.whySofterDeveloper || "",
      motivatesMe: selectedStudent.motivatesMe || "",
      longTermVision: selectedStudent.longTermVision || "",
      favoriteQuote: selectedStudent.favoriteQuote || "",
      joinedOn: selectedStudent.joinedOn || "",
      inFocus: ""
    };
  }

  handleUpdate = e => {
    e.preventDefault();
    const _id = this.props.myId;
    const newPhoto = this.state.photo;
    const newSrc = this.state.src;
    const newAlt = this.state.alt;
    const formData = new FormData();
    formData.append("photo", newPhoto);
    formData.append("src", newSrc);
    formData.append("alt", newAlt);
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("title", this.state.title);
    formData.append("nationality", this.state.nationality);
    formData.append("skills", this.state.skills);
    formData.append("whySofterDeveloper", this.state.whySofterDeveloper);
    formData.append("longTermVision", this.state.longTermVision);
    formData.append("motivatesMe", this.state.motivatesMe);
    formData.append("favoriteQuote", this.state.favoriteQuote);
    formData.append("joinedOn", this.state.joinedOn);

    document.getElementById("waiting-update").style.display = "block";
    const history = this.props.history;
    this.props.updateStudent(formData, _id, history);
  };
  handleOnChange = e => {
    const {
      target: { value, name }
    } = e;
    this.setState({
      [name]: value
    });
  };
  changePhoto(e) {
    this.setState({ photo: e.target.files[0] });
  }

  render() {
    const errors = utils.validate(this.state.firstName, this.state.lastName);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const inputInfo = [
      {
        id: "title",
        name: "title",
        type: "text",
        placeholder: "Title",
        value: this.state.title,
        onChange: this.handleOnChange
      },
      {
        id: "nationality",
        name: "nationality",
        type: "text",
        placeholder: "Nationality",
        value: this.state.nationality,
        onChange: this.handleOnChange
      },
      {
        id: "skills",
        name: "skills",
        type: "text",
        placeholder: "Skills",
        value: this.state.skills,
        onChange: this.handleOnChange
      },
      {
        id: "whySofterDeveloper",
        name: "whySofterDeveloper",
        type: "text",
        placeholder: "Why a software developer",
        value: this.state.whySofterDeveloper,
        onChange: this.handleOnChange
      },
      {
        id: "longTermVision",
        name: "longTermVision",
        type: "text",
        placeholder: "Long term vision",
        value: this.state.longTermVision,
        onChange: this.handleOnChange
      },
      {
        id: "motivatesMe",
        name: "motivatesMe",
        type: "text",
        placeholder: "What motivates me",
        value: this.state.motivatesMe,
        onChange: this.handleOnChange
      },
      {
        id: "favoriteQuote",
        name: "favoriteQuote",
        type: "text",
        placeholder: "Favorite quote",
        value: this.state.favoriteQuote,
        onChange: this.handleOnChange
      },
      {
        id: "joinedOn",
        name: "joinedOn",
        type: "text",
        placeholder: "Joined on",
        value: this.state.joinedOn,
        onChange: this.handleOnChange
      }
    ];
    const inputField = inputInfo.map(input => (
      <div>
        <label htmlFor={input.name}>{input.placeholder}:</label>
        <input
          id={input.id}
          name={input.name}
          type={input.type}
          placeholder={input.placeholder}
          value={input.value}
          onChange={input.onChange}
        />
      </div>
    ));
    return (
      <div>
        <div className="subhead">
          <NavLink to="/">
            <i className="fas fa-2x fa-angle-double-left" />
          </NavLink>
        </div>
        <div className="container">
          <form method="put">
            <label htmlFor="photo">Update photo:</label>
            <input
              className="photo"
              id="photo"
              name="photo"
              type="file"
              multiple="multiple"
              onChange={e => this.changePhoto(e)}
            />
            <label htmlFor="firstName">First name:</label>
            <input
              className={errors.firstName ? "error" : ""}
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={this.state.firstName}
              onChange={this.handleOnChange}
            />
            <div className={errors.firstName ? "invalid" : "valid"}>
              First name is required
            </div>

            <label htmlFor="lastName">Last name:</label>
            <input
              className={errors.lastName ? "error" : ""}
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={this.handleOnChange}
            />
            <div className={errors.lastName ? "invalid" : "valid"}>
              Last name is required
            </div>
            {inputField}
            <div className="form-submit">
              <button
                className="button-save"
                type="submit"
                disabled={isDisabled}
                onClick={this.handleUpdate}
              >
                <i className="fa fa-3x fa-check-circle" />
              </button>
              <NavLink
                className="button-cancel"
                to={"/students/" + this.props.myId}
              >
                <i className="fa fa-2x fa-window-close" />
              </NavLink>
            </div>
            <div id="waiting-update">Updating information ...</div>
          </form>
        </div>
      </div>
    );
  }
}
EditStudent.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
const mapStateToProps = state => {
  return {
    students: state
  };
};

export default connect(
  mapStateToProps,
  { updateStudent }
)(EditStudent);
