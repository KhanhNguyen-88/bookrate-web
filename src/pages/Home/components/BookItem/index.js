import { faChevronDown, faComment, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import AuthorItem from "../../../../components/AuthorItem";
import Button from "../../../../components/Button";
import ShowStars from "../../../../components/ShowStars";
import UserItem from "../../../../components/UserItem";
import style from "./BookItem.module.scss";
import { useState, useEffect, Fragment } from "react";
import { getToken } from "../../../../services/localStorageService";
import UserComment from "../../../../components/UserComment";
import CommentRatingForm from "../CommetRatingForm";
import Popup from "reactjs-popup";

const cx = classNames.bind(style);
function BookItem({ item }) {
  const [categories, setCategories] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isLike, setIsLike] = useState(
    item.bookResponse.isFavorite != 0 ? true : false
  );
  // const [feedBacks, setFeedBacks] = useState(item.feedbackResponseList != null ? item.feedbackResponseList : []);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const paramsBookId = {
      bookId: item.bookResponse.id || 0,
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
  const renderComment = () => {
    const feedBacks =
      item.feedbackResponseList != null ? item.feedbackResponseList : [];
    return feedBacks.map((com, index) => {
      return <UserComment key={index} commentData={com} />;
    });
  };

  const handleLike = (bookId) => {
    const token = getToken();
    fetch(`http://localhost:8081/api/user/mark-favorite-book/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
    setIsLike(true);
  };

  const handleUnLike = (bookId) => {
    const token = getToken();
    fetch(`http://localhost:8081/api/user/unmark-favorite-book/${bookId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
    setIsLike(false);
  };
  const handleCommentSubmit = (data) => {
    console.log("Dữ liệu gửi:", data);
    // Gửi dữ liệu đến API hoặc xử lý tại đây
    // fetch("API_ENDPOINT", { method: "POST", body: JSON.stringify(data) })
  };
  return (
    <Fragment>
      <div className={cx("bookWrapper")}>
        <div className={cx("book")}>
          <div className={cx("thumbnail")}>
            <img src={item.bookResponse.bookImage} alt="book-img" />
            <div className={cx("btnGroup")}>
              {isLike ? (
                <div className={cx("btnLiked")}>
                  <Button
                    liked
                    onClick={() => handleUnLike(item.bookResponse.id)}
                  >
                    Liked
                  </Button>
                </div>
              ) : (
                <div className={cx("wtRead")}>
                  <Button
                    second
                    onClick={() => handleLike(item.bookResponse.id)}
                  >
                    Quan tâm
                  </Button>
                  <span></span>
                  <Button second>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </Button>
                </div>
              )}
              <Button second>Tìm mua</Button>
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("creator")}>
              <UserItem userFollowing={userInfo} />
              <p>{item.bookResponse.createdAt}</p>
            </div>
            <h3 className={cx("title")}>{item.bookResponse.bookName}</h3>
            <div>
              <div className={cx("rate")}>
                <ShowStars points={item.bookResponse.averageRating} />
                <div className={cx("points")}>
                  {item.bookResponse.averageRating}
                </div>
                <span className={cx("ratings")}>
                  {item.bookResponse.totalRating} ratings
                </span>
              </div>
            </div>
            <div className={cx("award")}>
              <span>Choice Award</span>
              <span className={cx("awardName")}>
                {/* <Button to>{item.awards}</Button> */}
              </span>
            </div>
            <div className={cx("intro")}>
              <p>{item.bookResponse.bookDescription}</p>
            </div>
            <div className={cx("genres")}>
              <p>Genres</p>
              <strong>{renderBookGenres()}</strong>
            </div>
            <div className={cx("author")}>
              <p>Author</p>
              <strong>{item.bookResponse.bookAuthor}</strong>
            </div>
          </div>
        </div>
        <div className={cx("comment")}>
          <div className={cx("commentInfo")}>
            <Button>View more comment</Button>
            <Button
              leftIcon={<FontAwesomeIcon icon={faComment} />}
              onClick={() => setOpenPopup(true)}
            >
              {item.feedbackResponseList != null
                ? item.feedbackResponseList.length
                : 0}{" "}
              comment
            </Button>
            <Popup
              open={openPopup} // Kiểm soát mở popup qua trạng thái
              onClose={() => setOpenPopup(false)} // Đóng popup
              modal
              nested
            >
              {(close) => (
                <div className={cx("commentPost")}>
                  <div className = {cx("headerCom")}>
                    <h3>All Comment</h3>
                    <Button onClick={()=>setOpenPopup(false)}><FontAwesomeIcon icon={faXmark}/></Button>
                  </div>
                  <div className={cx("comments")}>{renderComment()}</div>
                  <CommentRatingForm bookId={item.bookResponse.id} />
                </div>
              )}
            </Popup>
          </div>
          {renderComment()[0]}
          <CommentRatingForm
            bookId={item.bookResponse.id}
            onSubmit={handleCommentSubmit}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default BookItem;
