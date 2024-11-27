import classNames from "classnames/bind";
import style from "./Book.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);
function Book({ book}) {
  return (
    <Link className={cx("wrapper")} to={`/book/${book.id}`}>
      <div className={cx("thumbnail")}>
        <img src={book.bookImage}></img>
      </div>
      <div className={cx("ratings")}>
          <strong>{book.averageRating} <FontAwesomeIcon icon={faStar}/></strong>
          <p>{book.totalRating} ratings</p>
        </div>
      <div className={cx("info")}>
        <h6 className={cx("title")}>{book.bookName}</h6>
        <h6 className={cx("author")}>{book.bookAuthor}</h6>
      </div>
    </Link>
  );
}

export default Book;
