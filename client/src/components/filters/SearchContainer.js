import React from "react";
import { connect } from "react-redux";
import { getStudents, clearDetails } from "../../store/actions/searchActions";
import Search from "../filters/Search";

const SearchContainer = ({ onChangeHandler, input }) => {
  return <Search onChangeHandler={onChangeHandler} input={input} />;
};

const mapStateToProps = state => ({
  students: state.student.students
});
const mapDispatchToProps = dispatch => {
  {
    onChangeValue: e => {
      dispatch(searchStudents(e.target.value));
      //   dispatch(clearDetails());
    };
  }
};

const connected = connect(mapStateToProps, mapDispatchToProps)(SearchContainer);

export default connected;
