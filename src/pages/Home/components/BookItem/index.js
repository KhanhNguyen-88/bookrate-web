import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import AuthorItem from "../../../../components/AuthorItem";
import Button from "../../../../components/Button";
import ShowStars from "../../../../components/ShowStars";
import UserItem from "../../../../components/UserItem";
import style from "./BookItem.module.scss";
import { useState, useEffect } from "react";

const cx = classNames.bind(style);
function BookItem({ item }) {
  const [categories, setCategories] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const paramsBookId = {
      bookId: item.id || 0,
    };
    const queryBookIdString = new URLSearchParams(paramsBookId).toString();
    fetch(
      `http://localhost:8081/api/category/get-by-book?${queryBookIdString}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setCategories(result.result);
        console.log(result.result);
      });
  }, [item.id]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/user/detail/1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUserInfo(result.result);
        console.log(result.result);
      });
  }, []);
  const renderBookGenres = () => {
    return categories.map((item, index) => {
      return (
        <Button key={index} to={`/explore/${item.id}`}>
          {item.cateName}
        </Button>
      );
    });
  };

  return (
    <div className={cx("book")}>
      <div className={cx("thumbnail")}>
        <img src={item.bookImage} alt="book-img" />
        <div className={cx("btnGroup")}>
          <div className={cx("wtRead")}>
            <Button second>Quan tâm</Button>
            <span></span>
            <Button second>
              <FontAwesomeIcon icon={faChevronDown} />
            </Button>
          </div>
          <Button second>Tìm mua</Button>
        </div>
      </div>
      <div className={cx("info")}>
        <div className = {cx("creator")}>
          <UserItem userFollowing={userInfo} />
          <p>{item.createdAt}</p>
        </div>
        <h3 className={cx("title")}>{item.bookName}</h3>
        <div>
          <div className={cx("rate")}>
            <ShowStars points={item.averageRating} />
            <div className={cx("points")}>{item.averageRating}</div>
            <span className={cx("ratings")}>{item.totalRating} ratings</span>
          </div>
        </div>
        <div className={cx("award")}>
          <span>Choice Award</span>
          <span className={cx("awardName")}>
            {/* <Button to>{item.awards}</Button> */}
          </span>
        </div>
        <div className={cx("intro")}>
          <p>{item.bookDescription}</p>
        </div>
        <div className={cx("genres")}>
          <p>Genres</p>
          <strong>{renderBookGenres()}</strong>
        </div>
        <div className={cx("author")}>
          <p>Author</p>
          <strong>{item.bookAuthor}</strong>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
