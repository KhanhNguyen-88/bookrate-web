import {
  faChevronDown,
  faComment,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../../../../components/Button";
import ShowStars from "../../../../components/ShowStars";
import UserItem from "../../../../components/UserItem";
import style from "./BookItem.module.scss";
import { useState, useEffect, Fragment } from "react";
import { getToken } from "../../../../services/localStorageService";
import UserComment from "../../../../components/UserComment";
import CommentRatingForm from "../CommetRatingForm";
import Popup from "reactjs-popup";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);
function BookItem({ item }) {
  const [categories, setCategories] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng ngày tháng năm theo tiếng Việt
  };
  useEffect(() => {
    setIsLike(item.bookResponse.isFavorite !== 0); // Cập nhật dựa trên giá trị mới
  }, [item.bookResponse.isFavorite]);

  // const [feedBacks, setFeedBacks] = useState(item.feedbackResponseList != null ? item.feedbackResponseList : []);
  const [openPopup, setOpenPopup] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:8081/api/file/preview/${item.bookResponse.bookImage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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
      .catch((e) => {
        console.log("Ảnh chưa có trên cloud");
      });
  });

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
  }, [item.bookResponse.id]);

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
  const handleShowDetail = (bookId) => {
    return navigate(`/book/${bookId}`)
  };

  return (
    <Fragment>
      <div className={cx("bookWrapper")}>
        <div className={cx("book")}>
          <div className={cx("thumbnail")}>
            <img onClick={()=>handleShowDetail(item.bookResponse.id)}
              src={`http://103.216.116.98:9000/book-rating/${item.bookResponse.bookImage}`}
              alt="book-img"
            />
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
              <Button second href={item.bookResponse.bookSaleLink} saleLink target={"_blank"}>Tìm mua</Button>
            </div>
          </div>
          <div className={cx("info")}>
            <div className={cx("creator")}>
              <UserItem
                userImage={item.bookResponse.userImage}
                userName={item.bookResponse.createdBy}
                userId={item.bookResponse.userId}
              />
              <p>{formatDate(item.bookResponse.createdAt)}</p>
            </div>
            <h3 className={cx("title")}>{item.bookResponse.bookName}</h3>
            <div>
              <div className={cx("rate")} onClick={() => handleShowDetail(item.bookResponse.id)}>
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
                  <div className={cx("headerCom")}>
                    <h3>All Comment</h3>
                    <Button onClick={() => setOpenPopup(false)}>
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
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
