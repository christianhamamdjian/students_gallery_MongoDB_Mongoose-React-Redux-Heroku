import React from "react";
import { Button } from "reactstrap";
import "../../App.css";
const Sorting = props => {
  return (
    <div className="">
      <div id="sort-box">
        <h2>Sort By: </h2>
        <Button id="sort-by-first-name" onClick={props.sortByFirstName}>
          First name{" "}
          <i className={props.sortAscFn === true ? "sort-asc" : "sort-desc"} />
        </Button>
        <Button id="sort-by-last-name" onClick={props.sortByLastName}>
          Last name{" "}
          <i className={props.sortAscLn === true ? "sort-asc" : "sort-desc"} />
        </Button>
      </div>
      <br />
    </div>
  );
};

export default Sorting;
