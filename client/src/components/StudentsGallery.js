import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, ListGroup, Spinner } from "reactstrap";
import "../App.css";
import { searchResult, deleteStudent } from "../store/actions/studentActions";
import Pagination from "./filters/Pagination";
import Search from "./filters/Search";
import Sorting from "./filters/Sorting";
import InfoCard from "./InfoCard";

class StudentsGallery extends Component {
  state = {
    input: "",
    sortAscFn: true,
    sortDescFn: false,
    sortAscLn: true,
    sortDescLn: false
  };

  onChangeHandler = e => {
    let input = e.target.value;
    const { searchResult } = this.props;
    this.setState(
      {
        input: input
      },
      () => searchResult(input)
    );
  };

  // Sorting
  sortList = sorting => {
    let original = this.props.students;
    let filtered = this.props.filteredlist;
    let sortables = filtered.length === 0 ? original : filtered;
    console.log(sortables);
    switch (sorting) {
      case "firstName":
        if (this.state.sortAscFn === false) {
          // asc
          sortables.sort(function(a, b) {
            if (a.firstName < b.firstName) return -1;
            if (a.firstName > b.firstName) return 1;
            return 0;
          });
          this.setState({
            sortAscLn: false,
            sortDescLn: false,
            sortAscFn: true,
            sortDescFn: false
          });
        } else if (this.state.sortAscFn === true) {
          // desc
          sortables.sort(function(a, b) {
            if (a.firstName < b.firstName) return 1;
            if (a.firstName > b.firstName) return -1;
            return 0;
          });
          this.setState({
            sortAscLn: false,
            sortDescLn: false,
            sortAscFn: false,
            sortDescFn: true
          });
        }
        break;
      case "lastName":
        // asc
        if (this.state.sortAscLn === false) {
          sortables.sort(function(a, b) {
            if (a.lastName < b.lastName) return -1;
            if (a.lastName > b.lastName) return 1;
            return 0;
          });
          this.setState({
            sortAscFn: false,
            sortDescFn: false,
            sortAscLn: true,
            sortDescLn: false
          });
        } else if (this.state.sortAscLn === true) {
          // desc
          sortables.sort(function(a, b) {
            if (a.lastName < b.lastName) return 1;
            if (a.lastName > b.lastName) return -1;
            return 0;
          });
          this.setState({
            sortAscFn: false,
            sortDescFn: false,
            sortAscLn: false,
            sortDescLn: true
          });
        }
        break;
      default:
        return;
    }
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

    // Items displayed per Page
    const visibleItems =
      input !== "" && filteredlist.length !== 0
        ? filteredlist.slice(firstItemIndex, firstItemIndex + itemsPerPage)
        : input !== "" && filteredlist.length === 0
        ? []
        : students.slice(firstItemIndex, firstItemIndex + itemsPerPage);

    // Build Cards List
    const cardsList =
      // If no input or Loading is true show spinner
      (input !== "" && filteredlist.length === 0) || loading ? (
        <div style={{ margin: "0 auto" }}>
          <Spinner color="light" />
        </div>
      ) : (
        // Show the list
        <TransitionGroup className="gallery">
          {visibleItems.map((stud, _id) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <InfoCard
                key={stud._id}
                firstName={stud.firstName}
                lastName={stud.lastName}
                myId={stud._id}
                src={stud.src}
                handleDelete={() => {
                  this.handleDelete(stud, _id);
                }}
                items={students}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      );

    return (
      <Fragment>
        <div className="my-filter">
          {/* Search */}
          <Search onChangeHandler={this.onChangeHandler} input={input} />

          {/* Sorting */}
          <Sorting
            sortByFirstName={() => this.sortList("firstName")}
            sortByLastName={() => this.sortList("lastName")}
            sortAscFn={sortAscFn}
            sortDescFn={sortDescFn}
            sortAscLn={sortAscLn}
            sortDescLn={sortDescLn}
          />

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
StudentsGallery.propTypes = {
  students: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  students: state.student.students,
  filteredlist: state.student.filteredlist,
  itemsPerPage: state.student.itemsPerPage,
  currentPage: state.student.currentPage,
  numberOfPages: state.student.numberOfPages,
  loading: state.student.loading
});
const mapDispatchToProps = dispatch => {
  return {
    deleteStudent: id => dispatch(deleteStudent(id)),
    searchResult: input => dispatch(searchResult(input))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentsGallery);
