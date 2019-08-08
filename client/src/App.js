import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Main from "./components/Main";
import { getStudents } from "./store/actions/studentActions";
import { loadUser } from "./store/actions/authActions";
import store from "./store/store";
import { Provider } from "react-redux";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(getStudents());
  }
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
