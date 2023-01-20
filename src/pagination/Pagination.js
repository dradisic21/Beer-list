import React from "react";
import "./Pagination.css";
import "../../src/ui/button.css";

const Pagination = (props) => {
  const { currentPage, maxPageLimit, minPageLimit, totalPages } = props;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrevClick = () => {
    console.log('click');
    props.onPrevClick();
  };

  const handleNextClick = () => {
    console.log('click');
    props.onNextClick();
  };

  

  return (
    <div className="main">
      <div className="page-button">
        <button onClick={handlePrevClick} disabled={currentPage === pages[0]}>
          Prev
        </button>
        <button
          onClick={handleNextClick}
          disabled={currentPage === pages[pages.length - 1]}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
