import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import integrifyLogo from "./assets/integrify_logo.png";
import "./App.css";
import { connect } from "react-redux";

import NewStudent from "./components/NewStudent";
import SingleStudent from "./components/SingleStudent";
import StudentsGallery from "./components/StudentsGallery";
import EditStudent from "./components/EditStudent";
import { getStudents } from "./store/actions";

const NotFound = () => {
  return <h2> The page was not found</h2>;
};

class App extends Component {
  componentDidMount() {
    this.props.getStudents();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="header">
              <NavLink to="/">
                <img alt="" src={integrifyLogo} />
              </NavLink>
              <h1>Students Gallery</h1>
            </div>
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

export default connect(
  mapStateToProps,
  { getStudents }
)(App);
