import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { nextPage, previousPage } from "../../store/actions/filtersActions";
import Pagination from "./Pagination";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  students: state.student.students,
  filteredlist: state.filters.filteredlist,
  currentPage: state.filters.currentPage,
  itemsPerPage: state.filters.itemsPerPage,
  loading: state.student.loading
});
const mapDispatchToProps = dispatch => {
  return {
    nextPage: id => dispatch(nextPage(id)),
    previousPage: id => dispatch(previousPage(id))
  };
};
const PaginationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
export default PaginationContainer;
