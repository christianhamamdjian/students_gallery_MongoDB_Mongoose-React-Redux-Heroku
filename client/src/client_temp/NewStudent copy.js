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
  // handleFileSelect = evt => {
  //   const reader;
  //   const progress = document.querySelector('.percent');
  //   // Reset progress indicator on new file selection.
  //   progress.style.width = "0%";
  //   progress.textContent = "0%";

  //   reader = new FileReader();
  //   reader.onerror = errorHandler;
  //   reader.onprogress = updateProgress;
  //   reader.onabort = function(e) {
  //     alert("File read cancelled");
  //   };
  //   reader.onloadstart = function(e) {
  //     document.getElementById("progress_bar").className = "loading";
  //   };
  //   reader.onload = function(e) {
  //     // Ensure that the progress bar displays 100% at the end.
  //     progress.style.width = "100%";
  //     progress.textContent = "100%";
  //     setTimeout("document.getElementById('progress_bar').className='';", 2000);
  //   };
  // };

  handleSave = e => {
    e.preventDefault();

    // let files = e.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    // let output = [];
    // for (let i = 0, f; (f = files[i]); i++) {
    //   output.push(
    //     "<li><strong>",
    //     escape(f.name),
    //     "</strong> (",
    //     f.type || "n/a",
    //     ") - ",
    //     f.size,
    //     " bytes, last modified: ",
    //     f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : "n/a",
    //     "</li>"
    //   );
    // }
    // document.getElementById("list").innerHTML =
    //   "<ul>" + output.join("") + "</ul>";

    // document.getElementById('files').addEventListener('change', handleFileSelect, false);

    let fullPath = document.getElementById("photo").value;
    let filename = "";
    if (fullPath) {
      let startIndex =
        fullPath.indexOf("\\") >= 0
          ? fullPath.lastIndexOf("\\")
          : fullPath.lastIndexOf("/");
      filename = fullPath.substring(startIndex);
      if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
        filename = filename.substring(1);
      }
    }
    // console.log(e);

    const photo = e.target.files[0];
    const src = this.getPhoto.value;
    const alt = this.getPhoto.value;
    const firstName = this.getFirstName.value;
    const lastName = this.getLastName.value;
    const title = this.getTitle.value;
    const nationality = this.getNationality.value;
    const skills = this.getSkills.value;
    const whySofterDeveloper = this.getWhySofterDeveloper.value;
    const longTermVision = this.getLongTermVision.value;
    const motivatesMe = this.getMotivatesMe.value;
    const favoriteQuote = this.getFavoriteQuote.value;
    const joinedOn = this.getJoinedOn.value;

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
    // editing: false
    console.log(payload);

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

    this.getPhoto.value = "";
    this.getFirstName.value = "";
    this.getLastName.value = "";
    this.getTitle.value = "";
    this.getNationality.value = "";
    this.getSkills.value = "";
    this.getWhySofterDeveloper.value = "";
    this.getLongTermVision.value = "";
    this.getMotivatesMe.value = "";
    this.getFavoriteQuote.value = "";
    this.getJoinedOn.value = "";

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSave} encType="multipart/form-data">
          <label htmlFor="photo">Photo:</label>
          <output id="list" />
          <input
            id="photo"
            name="photo"
            type="file"
            multiple="multiple"
            placeholder="Upload your photo"
            ref={input => (this.getPhoto = input)}
          />

          <label htmlFor="firstName">First name:</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First name"
            ref={input => (this.getFirstName = input)}
          />

          <label htmlFor="lastName">Last name:</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last name"
            ref={input => (this.getLastName = input)}
          />
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            ref={input => (this.getTitle = input)}
          />
          <label htmlFor="nationality">Nationality:</label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            placeholder="Nationality"
            ref={input => (this.getNationality = input)}
          />
          <label htmlFor="skills">Skills:</label>
          <input
            id="skills"
            name="skills"
            type="text"
            placeholder="Skills"
            ref={input => (this.getSkills = input)}
          />
          <label htmlFor="whySofterDeveloper">Why a software developer:</label>
          <input
            id="whySofterDeveloper"
            name="whySofterDeveloper"
            type="text"
            placeholder="Why a software developer"
            ref={input => (this.getWhySofterDeveloper = input)}
          />
          <label htmlFor="longTermVision">Long term vision:</label>
          <input
            id="longTermVision"
            name="longTermVision"
            type="text"
            placeholder="Long term vision"
            ref={input => (this.getLongTermVision = input)}
          />
          <label htmlFor="motivatesMe">What motivates me:</label>
          <input
            id="motivatesMe"
            name="motivatesMe"
            type="text"
            placeholder="What motivates me"
            ref={input => (this.getMotivatesMe = input)}
          />
          <label htmlFor="favoriteQuote">Favorite quote:</label>
          <input
            id="favoriteQuote"
            name="favoriteQuote"
            type="text"
            placeholder="Favorite quote"
            ref={input => (this.getFavoriteQuote = input)}
          />
          <label htmlFor="joinedOn">Joined on:</label>
          <input
            id="joinedOn"
            name="joinedOn"
            type="text"
            placeholder="Joined on"
            ref={input => (this.getJoinedOn = input)}
          />

          <button type=" submit" value="Save">
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
