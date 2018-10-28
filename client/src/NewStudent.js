import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

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
      joinedOn: ""
    };
  }

  handleSave = e => {
    e.preventDefault();
    const photo = this.state.photo;
    const src = this.state.photo.name;
    const alt = this.state.photo.name;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const title = this.state.title;
    const nationality = this.state.nationality;
    const skills = this.state.skills;
    const whySofterDeveloper = this.state.whySofterDeveloper;
    const longTermVision = this.state.longTermVision;
    const motivatesMe = this.state.motivatesMe;
    const favoriteQuote = this.state.favoriteQuote;
    const joinedOn = this.state.joinedOn;

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("src", src);
    formData.append("alt", alt);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("title", title);
    formData.append("nationality", nationality);
    formData.append("skills", skills);
    formData.append("whySofterDeveloper", whySofterDeveloper);
    formData.append("longTermVision", longTermVision);
    formData.append("motivatesMe", motivatesMe);
    formData.append("favoriteQuote", favoriteQuote);
    formData.append("joinedOn", joinedOn);

    fetch("/api/newstudent", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      body: formData
    })
      .then(res => res.json())
      .then(response => {
        this.props.handleSubmit(response);
        this.props.history.push("/");
      });
  };

  addPhoto(addPhoto) {
    this.setState({ photo: addPhoto.target.files[0] });
  }
  addSrc(addSrc) {
    this.setState({ src: addSrc });
  }
  addAlt(addAlt) {
    this.setState({ alt: addAlt });
  }
  addFirstName(addFirstName) {
    this.setState({ firstName: addFirstName });
  }
  addLastName(addLastName) {
    this.setState({ lastName: addLastName });
  }
  addTitle(addTitle) {
    this.setState({
      title: addTitle
    });
  }
  addNationality(addNationality) {
    this.setState({ nationality: addNationality });
  }
  addSkills(addSkills) {
    this.setState({ skills: addSkills });
  }
  addWhySofterDeveloper(addWhySofterDeveloper) {
    this.setState({ whySofterDeveloper: addWhySofterDeveloper });
  }
  addMotivatesMe(addMotivatesMe) {
    this.setState({ motivatesMe: addMotivatesMe });
  }
  addLongTermVision(addLongTermVision) {
    this.setState({ longTermVision: addLongTermVision });
  }
  addFavoriteQuote(addFavoriteQuote) {
    this.setState({ favoriteQuote: addFavoriteQuote });
  }
  addJoinedOn(addJoinedOn) {
    this.setState({ joinedOn: addJoinedOn });
  }
  render() {
    return (
      <div className="container">
        <NavLink to="/">
          <i className="fas fa-2x fa-angle-double-left" />
        </NavLink>
        <form method="post">
          <label htmlFor="firstName">Upload photo:</label>
          <input
            className="photo"
            id="photo"
            name="photo"
            type="file"
            multiple="multiple"
            onChange={e => this.addPhoto(e)}
          />

          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            onChange={e => this.addFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            onChange={e => this.addLastName(e.target.value)}
          />

          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            onChange={e => this.addTitle(e.target.value)}
          />

          <label htmlFor="nationality">Nationality:</label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            placeholder="Nationality"
            onChange={e => this.addNationality(e.target.value)}
          />

          <label htmlFor="skills">Skills:</label>
          <input
            id="skills"
            name="skills"
            type="text"
            placeholder="Skills"
            onChange={e => this.addSkills(e.target.value)}
          />

          <label htmlFor="whySofterDeveloper">Why a software developer:</label>
          <input
            id="whySofterDeveloper"
            name="whySofterDeveloper"
            type="text"
            placeholder="Why a software developer"
            onChange={e => this.addWhySofterDeveloper(e.target.value)}
          />

          <label htmlFor="longTermVision">Long term vision:</label>
          <input
            id="longTermVision"
            name="longTermVision"
            type="text"
            placeholder="Long term vision"
            onChange={e => this.addLongTermVision(e.target.value)}
          />

          <label htmlFor="motivatesMe">What motivates me:</label>
          <input
            id="motivatesMe"
            name="motivatesMe"
            type="text"
            placeholder="What motivates me"
            onChange={e => this.addMotivatesMe(e.target.value)}
          />

          <label htmlFor="favoriteQuote">Favorite quote:</label>
          <input
            id="favoriteQuote"
            name="favoriteQuote"
            type="text"
            placeholder="Favorite quote"
            onChange={e => this.addFavoriteQuote(e.target.value)}
          />

          <label htmlFor="joinedOn">Joined on:</label>
          <input
            id="joinedOn"
            name="joinedOn"
            type="text"
            placeholder="Joined on"
            onChange={e => this.addJoinedOn(e.target.value)}
          />

          <button
            className="button-save"
            type="submit"
            onClick={this.handleSave}
          >
            <i className="fa fa-3x fa-check-circle" />
          </button>
          <NavLink className="button-cancel" to="/">
            <i className="fa fa-2x fa-window-close" />
          </NavLink>
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
    handleSubmit: payload => dispatch({ type: "ADD_STUDENT", payload })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewStudent);
