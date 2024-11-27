import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import classNames from "classnames/bind";
import style from "./PaginatedItems.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Book from "../../../NewExplore/components/Book";
import BookItem from "../BookItem";

const cx = classNames.bind(style);
function PaginatedItems({items, pageCount, onPageChange}) {
  const handlePageClick = (event) => {
    onPageChange(event.selected);
  };

  const renderBook = () =>{
    return items.map((item, index) => {
      return <BookItem key={index} item={item} />;
    });
  }
  return (
    <div className = {cx("wrapper")}>
      <div className = {cx("books")}>{renderBook()}</div>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<FontAwesomeIcon icon={faArrowRight}/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<FontAwesomeIcon icon={faArrowLeft}/>}
        renderOnZeroPageCount={null}
        containerClassName={cx("pagination")}
        pageClassName={cx("pagination__item")}
        pageLinkClassName={cx("pagination__item")}
        previousClassName={cx("pagination__item")}
        previousLinkClassName={cx("pagination__item")}
        nextClassName={cx("pagination__item")}
        nextLinkClassName={cx("pagination__item")}
        breakClassName={cx("pagination__item")}
        breakLinkClassName={cx("pagination__item")}
        activeClassName={cx("active")}
      />
    </div>
  );
}

export default PaginatedItems;
