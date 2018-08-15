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

import NewStudent from "./NewStudent";
import SingleStudent from "./SingleStudent";
import StudentsGallery from "./StudentsGallery";
import EditStudent from "./EditStudent";

const NotFound = () => {
  return <h2> The page was not found</h2>;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div id="my-blog">
            <Switch>
              <Route
                exact
                strict
                path="/"
                render={props => (
                  <StudentsGallery onSubmit="handleSave" {...props} />
                )}
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
                    onSubmit="handleSave"
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
export default App;
