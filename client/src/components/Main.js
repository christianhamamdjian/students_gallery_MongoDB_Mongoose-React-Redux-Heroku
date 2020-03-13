import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../App.css";
import StudentsGallery from "./StudentsGallery";
import AppNavbar from "./AppNavbar";
import { connect } from "react-redux";

const NotFound = () => {
  return <h2>The page was not found</h2>;
};

class Main extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <div className="header">
              <AppNavbar />
            </div>
            <Switch>
              <Route exact strict path="/" render={() => <StudentsGallery />} />
              <Route component={NotFound} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Main);
