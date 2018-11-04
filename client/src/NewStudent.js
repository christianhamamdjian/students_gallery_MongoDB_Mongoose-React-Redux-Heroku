import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 4) {
    errors.firstName = "Must be 4 characters or more";
  }
  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length < 4) {
    errors.lastName = "Must be 4 characters or more";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span className="message">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class NewStudent extends Component {

  handleSave = e => {
    e.preventDefault();
    let payload = this.props.posts.form.newPost.values;
    const request = async () => {
      try {
        const res = await fetch("/api/newstudent", {
          method: "POST",
          headers: {
            Accept: "application/json"
          },
          body: formData
        });
        const json = await res.json().then(response => {
          this.props.onSubmit(response);
          this.props.history.push("/");
        });
        return json;
      } catch (err) {
        alert(err);
      }
    };
    request();

  };

  render() {
    return (
      <div className="container">
        <NavLink to="/">
          <i className="fas fa-2x fa-angle-double-left" />
        </NavLink>

        <form method="post" onSubmit={this.handleSave}>
          <Field
            placeholder="Photo"
            name="addPhoto"
            type="text"
            component={renderField}
            label="First Name"
          />

          <Field
            placeholder="Src"
            name="addSrc"
            type="text"
            component={renderField}
            label="First Name"
          />

          <Field
            placeholder="Alt"
            name="addAlt"
            type="text"
            component={renderField}
            label="First Name"
          />

          <Field
            placeholder="First Name"
            name="firstName"
            type="text"
            component={renderField}
            label="First Name"
          />

          <Field
            placeholder="Last Name"
            name="lastName"
            type="text"
            component={renderField}
            label="Last Name"
          />

          <Field
            placeholder="Title"
            name="addTitle"
            type="text"
            component={renderField}
            label="Title"
          />

          <Field
            placeholder="Nationality"
            name="addNationality"
            type="text"
            component={renderField}
            label="Nationality"
          />

          <Field
            placeholder="Skills"
            name="addSkills"
            type="text"
            component={renderField}
            label="TSkillsemp"
          />

          <Field
            placeholder="Why a Software Developer"
            name="addWhySofterDeveloper"
            type="text"
            component={renderField}
            label="Why a Software Developer"
          />

          <Field
            placeholder="Motivates Me"
            name="addMotivatesMe"
            type="text"
            component={renderField}
            label="Motivates Me"
          />

          <Field
            placeholder="Long Term Vision"
            name="addLongTermVision"
            type="text"
            component={renderField}
            label="Long Term Vision"
          />

          <Field
            placeholder="Favorite Quote"
            name="addFavoriteQuote"
            type="text"
            component={renderField}
            label="Favorite Quote"
          />

          <Field
            placeholder="Joined On"
            name="addJoinedOn"
            type="text"
            component={renderField}
            label="Joined On"
          />


          <button
            className="button-save"
            type="submit"
          >
            <i className="fa fa-3x fa-check-circle" />
          </button>
          <NavLink className="button-cancel" to="/">
            <i className="fa fa-2x fa-window-close" />
          </NavLink>
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
          onSubmit: payload => dispatch({type: "ADD_STUDENT", payload })
      };
    };
    
const myForm = reduxForm({
          form: "newStudent",
        validate
        // warn
      })(NewStudent);
      
      export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(myForm);
      

