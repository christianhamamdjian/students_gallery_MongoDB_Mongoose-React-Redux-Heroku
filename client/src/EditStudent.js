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

class EditStudent extends Component {
  constructor(props) {
    super(props);

    const selectedStudent =
      props.students.find(student => student._id === props.myId) || {};
    console.log(selectedStudent);

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
      joinedOn: selectedStudent.joinedOn || ""
    };
  }

  handleUpdate = e => {
    e.preventDefault();
    const _id = this.props.myId;
    const newPhoto = this.state.photo;
    const newSrc = this.state.photo.name;
    const newAlt = this.state.photo.name;
    const newFirstName = this.state.firstName;
    const newLastName = this.state.lastName;
    const newTitle = this.state.title;
    const newNationality = this.state.nationality;
    const newSkills = this.state.skills;
    const newWhySofterDeveloper = this.state.whySofterDeveloper;
    const newMotivatesMe = this.state.motivatesMe;
    const newLongTermVision = this.state.longTermVision;
    const newFavoriteQuote = this.state.favoriteQuote;
    const newJoinedOn = this.state.joinedOn;

    const payload = {
      _id,
      newPhoto,
      newSrc,
      newAlt,
      newFirstName,
      newLastName,
      newTitle,
      newNationality,
      newSkills,
      newWhySofterDeveloper,
      newMotivatesMe,
      newLongTermVision,
      newFavoriteQuote,
      newJoinedOn
    };
    console.log("payload :", payload);

    const formData = new FormData();
    formData.append("photo", newPhoto);
    formData.append("src", newSrc);
    formData.append("alt", newAlt);
    formData.append("firstName", newFirstName);
    formData.append("lastName", newLastName);
    formData.append("title", newTitle);
    formData.append("nationality", newNationality);
    formData.append("skills", newSkills);
    formData.append("whySofterDeveloper", newWhySofterDeveloper);
    formData.append("longTermVision", newLongTermVision);
    formData.append("motivatesMe", newMotivatesMe);
    formData.append("favoriteQuote", newFavoriteQuote);
    formData.append("joinedOn", newJoinedOn);
    console.log(formData);
    fetch(`/api/update/${_id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        console.log("response", response);
        this.props.handleSubmit(response);
        this.props.history.push("/");
      });
  };
  changePhoto(changePhoto) {
    this.setState({ photo: changePhoto.target.files[0] });
    console.log(changePhoto.target.files[0]);
  }
  changeSrc(changeSrc) {
    this.setState({ src: changeSrc });
  }
  changeAlt(changeAlt) {
    this.setState({ alt: changeAlt });
  }
  changeFirstName(changeFirstName) {
    this.setState({ firstName: changeFirstName });
  }
  changeLastName(changeLastName) {
    this.setState({ lastName: changeLastName });
  }
  changeTitle(changedTitle) {
    this.setState({
      title: changedTitle
    });
  }
  changeNationality(changeNationality) {
    this.setState({ nationality: changeNationality });
  }
  changeSkills(changeSkills) {
    this.setState({ skills: changeSkills });
  }
  changeWhySofterDeveloper(changeWhySofterDeveloper) {
    this.setState({ whySofterDeveloper: changeWhySofterDeveloper });
  }
  changeMotivatesMe(changeMotivatesMe) {
    this.setState({ motivatesMe: changeMotivatesMe });
  }
  changeLongTermVision(changeLongTermVision) {
    this.setState({ longTermVision: changeLongTermVision });
  }
  changeFavoriteQuote(changeFavoriteQuote) {
    this.setState({ favoriteQuote: changeFavoriteQuote });
  }
  changeJoinedOn(changeJoinedOn) {
    this.setState({ joinedOn: changeJoinedOn });
  }

  render() {
    return (
      <div className="container">
        <form method="put">
          <NavLink to="/">
            <button className="buttoncancel">Cancel</button>
          </NavLink>
          <br />
          <br />
          <input
            id="photo"
            name="photo"
            type="file"
            multiple="multiple"
            onChange={e => this.changePhoto(e)}
          />

          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            value={this.state.firstName}
            onChange={e => this.changeFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            value={this.state.lastName}
            onChange={e => this.changeLastName(e.target.value)}
          />
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={e => this.changeTitle(e.target.value)}
          />
          <label htmlFor="nationality">Nationality:</label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            placeholder="Nationality"
            value={this.state.nationality}
            onChange={e => this.changeNationality(e.target.value)}
          />
          <label htmlFor="skills">Skills:</label>
          <input
            id="skills"
            name="skills"
            type="text"
            placeholder="Skills"
            value={this.state.skills}
            onChange={e => this.changeSkills(e.target.value)}
          />
          <label htmlFor="whySofterDeveloper">Why a software developer:</label>
          <input
            id="whySofterDeveloper"
            name="whySofterDeveloper"
            type="text"
            placeholder="Why a software developer"
            value={this.state.whySofterDeveloper}
            onChange={e => this.changeWhySofterDeveloper(e.target.value)}
          />
          <label htmlFor="longTermVision">Long term vision:</label>
          <input
            id="longTermVision"
            name="longTermVision"
            type="text"
            placeholder="Long term vision"
            value={this.state.longTermVision}
            onChange={e => this.changeLongTermVision(e.target.value)}
          />
          <label htmlFor="motivatesMe">What motivates me:</label>
          <input
            id="motivatesMe"
            name="motivatesMe"
            type="text"
            placeholder="What motivates me"
            value={this.state.motivatesMe}
            onChange={e => this.changeMotivatesMe(e.target.value)}
          />
          <label htmlFor="favoriteQuote">Favorite quote:</label>
          <input
            id="favoriteQuote"
            name="favoriteQuote"
            type="text"
            placeholder="Favorite quote"
            value={this.state.favoriteQuote}
            onChange={e => this.changeFavoriteQuote(e.target.value)}
          />
          <label htmlFor="joinedOn">Joined on:</label>
          <input
            id="joinedOn"
            name="joinedOn"
            type="text"
            placeholder="Joined on"
            value={this.state.joinedOn}
            onChange={e => this.changeJoinedOn(e.target.value)}
          />

          <button className="button" type="submit" onClick={this.handleUpdate}>
            Update
          </button>
        </form>
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
