import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import SmallBookItem from "../SmallBookItem";
import classNames from "classnames/bind";
import style from "./PaginatedItems.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);
function PaginatedItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const renderSmallBook = () => {
    return currentItems.map((item, index) => {
      return <SmallBookItem key={index} smallBook={item} />;
    });
  };
  return (
    <>
      {renderSmallBook()}
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
    </>
  );
}

export default PaginatedItems;
