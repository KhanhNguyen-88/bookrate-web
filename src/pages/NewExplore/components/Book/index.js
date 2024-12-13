import classNames from "classnames/bind";
import style from "./Book.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);
function Book({ book }) {
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch(`http://localhost:8081/api/file/preview/${book.bookImage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Ảnh có trên cloud");
          return response.json();
        } else {
          throw new Error("Ảnh chưa có trên cloud hoặc server có lỗi.");
        }
      })
      .then((result) => {
        setImage(result.result);
      })
      .catch((e)=>{
        console.log("Ảnh chưa có trên cloud");
      })
  }, [book.bookImage]);
  return (
    <Link className={cx("wrapper")} to={`/book/${book.id}`}>
      <div className={cx("thumbnail")}>
        <img src={image}></img>
      </div>
      <div className={cx("ratings")}>
        <strong>
          {book.averageRating} <FontAwesomeIcon icon={faStar} />
        </strong>
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
