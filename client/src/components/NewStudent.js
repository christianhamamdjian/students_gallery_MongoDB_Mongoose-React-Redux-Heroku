import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import * as utils from "../utils";
import { newStudent } from "../store/actions";

class NewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: "",
      src: "",
      alt: "",
      firstName: "",
      lastName: "",
      title: "",
      nationality: "",
      skills: "",
      whySofterDeveloper: "",
      motivatesMe: "",
      longTermVision: "",
      favoriteQuote: "",
      joinedOn: "",
      inFocus: ""
    };
  }

  handleSave = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", this.state.photo);
    formData.append("src", this.state.photo.name);
    formData.append("alt", this.state.photo.name);
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

    document.getElementById("waiting").style.display = "block";
    const history = this.props.history;
    this.props.newStudent(formData, history);
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
          <form method="post">
            <label htmlFor="photo">Upload photo:</label>
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
                onClick={this.handleSave}
              >
                <i className="fa fa-3x fa-check-circle" />
              </button>
              <NavLink className="button-cancel" to="/">
                <i className="fa fa-2x fa-window-close" />
              </NavLink>
            </div>
            <div id="waiting">Uploading information ...</div>
          </form>
        </div>
      </div>
    );
  }
}
NewStudent.propTypes = {
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
  { newStudent }
)(NewStudent);
