import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { nextPage, previousPage } from "../../store/actions/filtersActions";

class Pagination extends Component {
  render() {
    const {
      filteredlist,
      students,
      itemsPerPage,
      currentPage,
      nextPage,
      previousPage
    } = this.props;

    let numberOfPages =
      this.props.filteredlist.length > 0
        ? Math.ceil(filteredlist.length / itemsPerPage) - 1
        : Math.ceil(students.length / itemsPerPage) - 1;

    console.log(numberOfPages);
    // Previous Page
    const showPreviousPage = () => {
      if (currentPage >= 1) {
        previousPage(currentPage);
      }
    };

    // Next Page
    const showNextPage = () => {
      if (currentPage <= numberOfPages) {
        nextPage(currentPage);
      }
    };

    return (
      <div className="">
        <h2>
          Pagination:{" "}
          <span style={{ fontSize: "16px" }}>
            Current page: {currentPage + 1} / {numberOfPages + 1}
          </span>
        </h2>
        <p>
          <Button
            color="light"
            disabled={currentPage < 1}
            onClick={showPreviousPage}
          >
            <i className="fas fa-caret-left pagination-arrow" />
            <span> Previous page</span>
          </Button>
          <Button
            color="light"
            disabled={currentPage >= numberOfPages}
            onClick={showNextPage}
          >
            <span>Next page </span>{" "}
            <i className="fas fa-caret-right pagination-arrow" />
          </Button>
        </p>
      </div>
    );
  }
}

export default Pagination;
