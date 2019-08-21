import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Container, ListGroup, Spinner } from "reactstrap";
import "../App.css";
// import Spinner from "./filters/Spinner";
import { deleteStudent } from "../store/actions/studentActions";
import Pagination from "./filters/Pagination";
import Search from "./filters/Search";
import Sorting from "./filters/Sorting";
import InfoCard from "./InfoCard";

class StudentsGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: "",
      page: 0,
      currentPage: null,
      itemsPerPage: 3,
      numberOfPages: 0,
      sortAscFn: true,
      sortDescFn: false,
      sortAscLn: true,
      sortDescLn: false
    };
  }

  // Search
  onChangeHandler = e => {
    this.setState({
      input: e.target.value,
      items: this.itemsFilter(e.target.value),
      currentPage: 0
    });
  };
  itemsFilter = input => {
    const { students } = this.props;
    return input
      ? students.filter(item =>
          item.firstName.toLowerCase().includes(input.toLowerCase())
        )
      : students;
  };

  // Previous Page
  showPreviousPage = () => {
    const { currentPage } = this.state;
    if (currentPage >= 1) {
      this.setState(() => ({
        // limit the page number to no less than 0
        currentPage: currentPage - 1
      }));
    }
  };

  // Next Page
  showNextPage = () => {
    const { currentPage, itemsPerPage } = this.state;
    let { numberOfPages } = this.state;
    numberOfPages = Math.floor(this.props.students.length / itemsPerPage);
    if (currentPage <= numberOfPages) {
      this.setState(() => ({
        // limit the page number to no greater than 2
        currentPage: currentPage + 1
      }));
    }
  };

  // Sorting
  sortByFirstName = items => {
    if (this.state.sortAscFn === false) {
      // asc
      this.setState({
        items: items.sort(function(a, b) {
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        }),
        sortAscLn: false,
        sortDescLn: false,
        sortAscFn: true,
        sortDescFn: false
      });
    } else if (this.state.sortAscFn === true) {
      // desc
      this.setState({
        items: items.sort(function(a, b) {
          if (a.firstName < b.firstName) return 1;
          if (a.firstName > b.firstName) return -1;
          return 0;
        }),
        sortAscLn: false,
        sortDescLn: false,
        sortAscFn: false,
        sortDescFn: true
      });
    }
  };
  sortByLastName = items => {
    // asc
    if (this.state.sortAscLn === false) {
      this.setState({
        items: items.sort(function(a, b) {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
          return 0;
        }),
        sortAscFn: false,
        sortDescFn: false,
        sortAscLn: true,
        sortDescLn: false
      });
    } else if (this.state.sortAscLn === true) {
      // desc
      this.setState({
        items: items.sort(function(a, b) {
          if (a.lastName < b.lastName) return 1;
          if (a.lastName > b.lastName) return -1;
          return 0;
        }),
        sortAscFn: false,
        sortDescFn: false,
        sortAscLn: false,
        sortDescLn: true
      });
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
    const { students, loading } = this.props;
    // Get State Variables
    const {
      items,
      input,
      itemsPerPage,
      sortAscFn,
      sortDescFn,
      sortAscLn,
      sortDescLn
    } = this.state;

    let { numberOfPages, currentPage } = this.state;

    // Get Number Of Pages
    numberOfPages =
      input !== ""
        ? // Calculate the Number of Pages from the State's Items
          Math.floor(items.length / itemsPerPage)
        : // Calculate the Number of Pages from the Props's Students
          Math.floor(students.length / itemsPerPage);

    // Start Page
    const firstItemIndex = currentPage * itemsPerPage;

    // Items displayed per Page
    const visibleItems =
      input !== "" && items.length !== 0
        ? // Calculate The Page Visible Items from the State's Items
          items.slice(firstItemIndex, firstItemIndex + itemsPerPage)
        : // Calculate The Page Visible Items from the Props's Students
        input !== "" && items.length === 0
        ? []
        : students.slice(firstItemIndex, firstItemIndex + itemsPerPage);
    // Build Cards List
    const cardsList =
      // If no input or Loading is true show spinner
      (input !== "" && items.length === 0) || loading ? (
        <div style={{ margin: "0 auto" }}>
          <Spinner color="light" />
        </div>
      ) : (
        // Show the list
        <TransitionGroup className="gallery">
          {visibleItems.map((stud, _id) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <InfoCard key={stud._id}
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
            sortByFirstName={() => this.sortByFirstName(students)}
            sortByLastName={() => this.sortByLastName(students)}
            sortAscFn={sortAscFn}
            sortDescFn={sortDescFn}
            sortAscLn={sortAscLn}
            sortDescLn={sortDescLn}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            showPreviousPage={this.showPreviousPage}
            showNextPage={this.showNextPage}
          />
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
  loading: state.student.loading
});

export default connect(
  mapStateToProps,
  { deleteStudent }
)(StudentsGallery);
