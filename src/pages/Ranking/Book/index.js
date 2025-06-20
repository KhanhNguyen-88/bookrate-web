import React, { useEffect, useState } from "react";
import styles from "./Book.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Book({ book, rank }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/api/file/preview/${book.bookImage}`)
      .then((response) => response.json())
      .then((result) => setImage(result.result))
      .catch(() => console.log("Error loading image"));
  }, [book.bookImage]);

  return (
    <Link to={`/book/${book.id}`} className={cx("item")}>
      <div className={cx("rank")}>{rank}</div>
      <div className={cx("imageContainer")}>
        <img src={`http://localhost:9000/image-book-rate/${book.bookImage}`} alt={book.bookName} />
        <div className={cx("overlay")}></div>
      </div>
    </Link>
  );
}

export default Book;
