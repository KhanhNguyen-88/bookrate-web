import React, { useEffect, useState } from "react";
import styles from "./Book.module.scss";
import classNames from "classnames/bind";

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
    <div className={cx("item")}>
      <div className={cx("rank")}>{rank}</div>
      <div className={cx("imageContainer")}>
        <img src={image} alt={book.bookName} />
        <div className={cx("overlay")}></div>
      </div>
    </div>
  );
}

export default Book;
