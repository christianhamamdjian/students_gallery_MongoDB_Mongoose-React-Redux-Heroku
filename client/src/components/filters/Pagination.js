import React from "react";
import { Button } from "reactstrap";

const Pagination = props => {
  return (
    <div className="">
      <h2>
        Pagination:{" "}
        <span style={{ fontSize: "16px" }}>
          Current page: {props.currentPage + 1} / {props.numberOfPages + 1}
        </span>
      </h2>
      <p>
        <Button
          color="light"
          disabled={props.currentPage <= 0}
          onClick={props.showPreviousPage}
        >
          <i className="fas fa-caret-left pagination-arrow" />
          <span> Previous page</span>
        </Button>
        <Button
          color="light"
          disabled={props.currentPage >= props.numberOfPages}
          onClick={props.showNextPage}
        >
          <span>Next page </span>{" "}
          <i className="fas fa-caret-right pagination-arrow" />
        </Button>
      </p>
    </div>
  );
};

export default Pagination;
