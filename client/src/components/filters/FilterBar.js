import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, ListGroup, Spinner } from "reactstrap";
import "../App.css";
import { searchResult } from "../store/actions/filtersActions";
import { deleteStudent } from "../store/actions/studentActions";
import Pagination from "./filters/Pagination";
import Search from "./filters/Search";
import Sorting from "./filters/Sorting";
import InfoCard from "./InfoCard";

class FilterBar extends Component {
  state = {
    input: ""
  };

  onChangeHandler = e => {
    let input = e.target.value;
    const { searchResult, students } = this.props;
    this.setState(
      {
        input: input
      },
      () => searchResult(input, students)
    );
  };

  // CRUD Delete
  handleDelete = (stud, _id) => {
    const { deleteStudent } = this.props;
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteStudent(stud._id);
    }
  };

  render() {
    // Get Array From Store
    let {
      students,
      loading,
      filteredlist,
      currentPage,
      itemsPerPage
    } = this.props;

    // Get State Variables
    const { input, sortAscFn, sortDescFn, sortAscLn, sortDescLn } = this.state;

    // Start Page
    const firstItemIndex = currentPage * itemsPerPage;

    return (
      <Fragment>
        <div className="my-filter">
          {/* Search */}
          <Search onChangeHandler={this.onChangeHandler} input={input} />

          {/* Sorting */}
          <Sorting />

          {/* Pagination */}
          <Pagination />
        </div>
        <Container>
          <ListGroup>
            {/* Cards List Gallery */}
            {cardsList}
          </ListGroup>
        </Container>
      </Fragment>
    );
  }
}
FilterBar.propTypes = {
  students: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  students: state.student.students,
  filteredlist: state.filters.filteredlist,
  itemsPerPage: state.filters.itemsPerPage,
  currentPage: state.filters.currentPage,
  loading: state.student.loading
});
const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => dispatch(deleteStudent(id)),
    searchResult: (input, students) => dispatch(searchResult(input, students))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
