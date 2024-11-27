import classNames from "classnames/bind";
import style from "./ItemBookSearch.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);
function ItemBookSearch({ item }) {
  return (
    <Link to={`/book/${item.id}`} className = {cx("wrapper")}>
      <img src={item.bookImage}></img>
      <div className = {cx("info")}>
        <strong>{item.bookName}</strong>
        <h5>{item.bookAuthor}</h5>
      </div>
    </Link>
  );
}

export default ItemBookSearch;
