import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import * as utils from "./utils";

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

    const request = async () => {
      document.getElementById("waiting-update").style.display = "block";
      try {
        const res = await fetch(`/api/update/${_id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json"
          },
          body: formData
        });

        const json = await res.json().then(response => {
          this.props.handleSubmit(response);
          setTimeout(function() {
            alert("Your information has been updated!");
          }, 500);
          this.props.history.push("/");
        });
        return json;
      } catch (err) {
        alert(err);
      }
    };
    request();
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
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleOnChange}
            />

            <label htmlFor="nationality">Nationality:</label>
            <input
              id="nationality"
              name="nationality"
              type="text"
              placeholder="Nationality"
              value={this.state.nationality}
              onChange={this.handleOnChange}
            />

            <label htmlFor="skills">Skills:</label>
            <input
              id="skills"
              name="skills"
              type="text"
              placeholder="Skills"
              value={this.state.skills}
              onChange={this.handleOnChange}
            />

            <label htmlFor="whySofterDeveloper">
              Why a software developer:
            </label>
            <input
              id="whySofterDeveloper"
              name="whySofterDeveloper"
              type="text"
              placeholder="Why a software developer"
              value={this.state.whySofterDeveloper}
              onChange={this.handleOnChange}
            />

            <label htmlFor="longTermVision">Long term vision:</label>
            <input
              id="longTermVision"
              name="longTermVision"
              type="text"
              placeholder="Long term vision"
              value={this.state.longTermVision}
              onChange={this.handleOnChange}
            />

            <label htmlFor="motivatesMe">What motivates me:</label>
            <input
              id="motivatesMe"
              name="motivatesMe"
              type="text"
              placeholder="What motivates me"
              value={this.state.motivatesMe}
              onChange={this.handleOnChange}
            />

            <label htmlFor="favoriteQuote">Favorite quote:</label>
            <input
              id="favoriteQuote"
              name="favoriteQuote"
              type="text"
              placeholder="Favorite quote"
              value={this.state.favoriteQuote}
              onChange={this.handleOnChange}
            />

            <label htmlFor="joinedOn">Joined on:</label>
            <input
              id="joinedOn"
              name="joinedOn"
              type="text"
              placeholder="Joined on"
              value={this.state.joinedOn}
              onChange={this.handleOnChange}
            />
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

const mapStateToProps = state => {
  return {
    students: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: payload => {
      dispatch({ type: "UPDATE_STUDENT", payload });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStudent);
