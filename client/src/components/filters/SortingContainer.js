import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import {
  sortByFirstName,
  sortByLastName
} from "../../store/actions/filtersActions";
import Sorting from "./Sorting";

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  students: state.student.students,
  filteredlist: state.filters.filteredlist,
  itemsPerPage: state.filters.itemsPerPage,
  loading: state.student.loading
});

const SortingContainer = connect(mapStateToProps)(Sorting);
export default SortingContainer;
