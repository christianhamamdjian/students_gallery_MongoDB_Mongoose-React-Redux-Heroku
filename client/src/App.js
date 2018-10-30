import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import integrifyLogo from "./integrify_logo.png";
import "./App.css";
import { connect } from "react-redux";

import NewStudent from "./NewStudent";
import SingleStudent from "./SingleStudent";
import StudentsGallery from "./StudentsGallery";
import EditStudent from "./EditStudent";

const NotFound = () => {
  return <h2> The page was not found</h2>;
};

class App extends Component {
  componentDidMount() {
    const request = async () => {
      try {
        const res = await fetch("/api/students");
        const json = await res
          .json()
          .then(students => this.props.getStudents(students));
        return json;
      } catch (err) {
        alert(err);
      }
    };
    request();
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <img alt="" src={integrifyLogo} />
          <h1>Students Gallery</h1>
        </div>
        <Router>
          <div id="my-blog">
            <Switch>
              <Route
                exact
                strict
                path="/"
                render={props => <StudentsGallery {...props} />}
              />
              <Route
                exact
                strict
                path="/new-student"
                render={props => <NewStudent {...props} />}
              />
              <Route
                exact
                strict
                path="/students/:studentId"
                render={props => (
                  <SingleStudent
                    {...props}
                    myId={props.match.params.studentId}
                  />
                )}
              />
              <Route
                exact
                strict
                path="/students/edit/:studentId"
                render={props => (
                  <EditStudent {...props} myId={props.match.params.studentId} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { students: state };
};
const mapDispatchToProps = dispatch => {
  return {
    getStudents: students =>
      dispatch({
        type: "GET_STUDENTS",
        students
      })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
