import classNames from "classnames/bind";
import style from "./ItemBookSearch.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(style);
function ItemBookSearch({ item }) {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/api/file/preview/${item.bookImage}`, {
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
  }, [item.bookImage]);
  return (
    <Link to={`/book/${item.id}`} className = {cx("wrapper")}>
      <img src={image !== "" ? image :item.bookImage}></img>
      <div className = {cx("info")}>
        <strong>{item.bookName}</strong>
        <h5>{item.bookAuthor}</h5>
      </div>
    </Link>
  );
}

export default ItemBookSearch;
