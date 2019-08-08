import React from "react";

const Search = props => {
  return (
    <div className="">
      <h2>Search: </h2>
      <input
        value={props.input}
        placeholder="Search..."
        id="my-input"
        type="text"
        onChange={props.onChangeHandler}
      />
    </div>
  );
};

export default Search;
