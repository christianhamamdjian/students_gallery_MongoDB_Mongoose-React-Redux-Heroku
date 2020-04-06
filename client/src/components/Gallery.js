import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, ListGroup, Spinner } from "reactstrap";
import "../App.css";
import { searchResult } from "../store/actions/filtersActions";
import { deleteStudent } from "../store/actions/studentActions";
import PaginationContainer from "./filters/PaginationContainer";
import Search from "./filters/Search";
import Sorting from "./filters/Sorting";
import InfoCard from "./InfoCard";

class StudentsGallery extends Component {
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
    const { input } = this.state;

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
export default connect(mapStateToProps, mapDispatchToProps)(StudentsGallery);
