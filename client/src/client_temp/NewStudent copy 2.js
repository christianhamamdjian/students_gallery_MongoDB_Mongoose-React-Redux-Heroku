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

    // let fullPath = document.getElementById("photo").value;
    // let filename = "";
    // if (fullPath) {
    //   let startIndex =
    //     fullPath.indexOf("\\") >= 0
    //       ? fullPath.lastIndexOf("\\")
    //       : fullPath.lastIndexOf("/");
    //   filename = fullPath.substring(startIndex);
    //   if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
    //     filename = filename.substring(1);
    //   }
    // }

    // const formData = new FormData();
    // formData.set('photo', files[0]);

    const photo = this.state.photo;
    const src = this.state.src;
    const alt = this.state.alt;
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

    const payload = {
      photo,
      src,
      alt,
      firstName,
      lastName,
      title,
      nationality,
      skills,
      whySofterDeveloper,
      longTermVision,
      motivatesMe,
      favoriteQuote,
      joinedOn
    };
    console.log("My payload:", payload);

    fetch("/api/newstudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      mode: "cors"
    })
      .then(res => {
        console.log("this is res", res);
      })
      .catch(err => {
        console.log("my errors", err);
      });

    this.props.handleSubmit(payload);

    this.props.history.push("/");
  };

  addPhoto(addPhoto) {
    this.setState({ photo: addPhoto.target.files[0] });
    console.log(addPhoto.target.files[0]);
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
  addTitle(adddTitle) {
    this.setState({
      title: adddTitle
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
        <form
          onSubmit={this.handleSave}
          method="post"
          encType="multipart/form-data"
        >
          <input
            id="photo"
            name="photo"
            type="file"
            multiple="multiple"
            placeholder="Upload your photo"
            ref={input => (this.getPhoto = input)}
            onChange={e => this.addPhoto(e)}
          />

          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            ref={input => (this.getFirstName = input)}
            onChange={e => this.addFirstName(e.target.value)}
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            ref={input => (this.getLastName = input)}
            onChange={e => this.addLastName(e.target.value)}
          />
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            ref={input => (this.getTitle = input)}
            onChange={e => this.addTitle(e.target.value)}
          />
          <label htmlFor="nationality">Nationality:</label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            placeholder="Nationality"
            ref={input => (this.getNationality = input)}
            onChange={e => this.addNationality(e.target.value)}
          />
          <label htmlFor="skills">Skills:</label>
          <input
            id="skills"
            name="skills"
            type="text"
            placeholder="Skills"
            ref={input => (this.getSkills = input)}
            onChange={e => this.addSkills(e.target.value)}
          />
          <label htmlFor="whySofterDeveloper">Why a software developer:</label>
          <input
            id="whySofterDeveloper"
            name="whySofterDeveloper"
            type="text"
            placeholder="Why a software developer"
            ref={input => (this.getWhySofterDeveloper = input)}
            onChange={e => this.addWhySofterDeveloper(e.target.value)}
          />
          <label htmlFor="longTermVision">Long term vision:</label>
          <input
            id="longTermVision"
            name="longTermVision"
            type="text"
            placeholder="Long term vision"
            ref={input => (this.getLongTermVision = input)}
            onChange={e => this.addLongTermVision(e.target.value)}
          />
          <label htmlFor="motivatesMe">What motivates me:</label>
          <input
            id="motivatesMe"
            name="motivatesMe"
            type="text"
            placeholder="What motivates me"
            ref={input => (this.getMotivatesMe = input)}
            onChange={e => this.addMotivatesMe(e.target.value)}
          />
          <label htmlFor="favoriteQuote">Favorite quote:</label>
          <input
            id="favoriteQuote"
            name="favoriteQuote"
            type="text"
            placeholder="Favorite quote"
            ref={input => (this.getFavoriteQuote = input)}
            onChange={e => this.addFavoriteQuote(e.target.value)}
          />
          <label htmlFor="joinedOn">Joined on:</label>
          <input
            id="joinedOn"
            name="joinedOn"
            type="text"
            placeholder="Joined on"
            ref={input => (this.getJoinedOn = input)}
            onChange={e => this.addJoinedOn(e.target.value)}
          />

          <button type="submit" onClick={this.handleSave}>
            Save
          </button>

          <NavLink to="/">
            <button>Cancel</button>
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
