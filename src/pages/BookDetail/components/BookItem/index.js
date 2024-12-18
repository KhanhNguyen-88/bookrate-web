import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import AuthorItem from "../../../../components/AuthorItem";
import Button from "../../../../components/Button";
import ShowStars from "../../../../components/ShowStars";
import UnderLine from "../../../../components/UnderLine";
import style from "./BookItem.module.scss";
import { Fragment, useEffect, useRef, useState } from "react";
import RateChartItem from "../RateChartItem";
import UserComment from "../../../Home/components/UserComment";
import { getToken } from "../../../../services/localStorageService";

const cx = classNames.bind(style);
function BookItem({ item, feedBackList, percent }) {
  const [categories, setCategories] = useState([]);
  const targetRef = useRef(null);
  const [image, setImage] = useState("");
  const [isLike, setIsLike] = useState(false);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN"); // Định dạng ngày tháng năm theo tiếng Việt
  };
  useEffect(() => {
    setIsLike(item.isFavorite !== 0); // Cập nhật dựa trên giá trị mới
  }, [item.isFavorite]);

  let avg = 0;
  let ratings = 0;

  if (feedBackList.length > 0) {
    const allRating = feedBackList.map((itemFB, index) => {
      return itemFB.rating;
    });
    const sum = allRating.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    avg = Math.round((sum / allRating.length) * 10) / 10;
    console.log(avg);
    ratings = feedBackList.length;
  }

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
      .catch((e) => {
        console.log("Ảnh chưa có trên cloud");
      });
  }, [item.bookImage]);

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

  const renderBookGenres = () => {
    return categories.map((item, index) => {
      return (
        <Button key={index} to={`/explore/${item.id}`}>
          {item.cateName}
        </Button>
      );
    });
  };

  const renderUserComment = () => {
    return feedBackList.map((cur, index) => {
      return (
        <div key={index}>
          <UserComment userFirstComment={cur}></UserComment>
          <UnderLine />
        </div>
      );
    });
  };
  const renderChart = () => {
    return percent.map((item, index) => {
      return (
        <div key={index}>
          <RateChartItem
            stars={item.levelStar}
            ratings={item.countStar}
            percent={item.percent}
          ></RateChartItem>
        </div>
      );
    });
  };
  const handleClickRate = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className={cx("book")}>
      <div className={cx("thumbnail")}>
        <img src={`http://103.216.116.98:9000/book-rating/${item.bookImage}`} alt="book-img" />
        <div className={cx("btnGroup")}>
          {isLike ? (
            <div className={cx("btnLiked")}>
              <Button liked onClick={() => handleUnLike(item.id)}>
                Liked
              </Button>
            </div>
          ) : (
            <div className={cx("wtRead")}>
              <Button second onClick={() => handleLike(item.id)}>
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
        <h3 className={cx("title")}>{item.bookName}</h3>
        <div>
          <div className={cx("rate")} onClick={handleClickRate}>
            <div className={cx("points")}>
              <ShowStars points={avg} />
              <p>{avg}</p>
            </div>
            <span className={cx("ratings")}>{ratings} ratings</span>
          </div>
        </div>
        <div className={cx("award")}>
          <span>Giải thưởng</span>
          <span className={cx("awardName")}>
            <Button to>Winner for Best Romance (2023)</Button>
          </span>
        </div>
        <div className={cx("intro")}>
          <p>{item.bookDescription}</p>
        </div>
        <UnderLine />
        <div className={cx("genres")}>
          <p>Thể loại</p>
          {renderBookGenres()}
        </div>
        <div className={cx("author")}>
          <p>Tác giả</p>
          {/* <AuthorItem authorInfo={} /> */}
          <li>{item.bookAuthor}</li>
        </div>
        <UnderLine />
        <div className={cx("editionInfo")}>
          <ul>
            <li>
              <p>Format</p>
              <p className={cx("detail")}>{item.bookFormat}</p>
            </li>
            <li>
              <p>Phát hành</p>
              <p className={cx("detail")}>{item.publishedDate}</p>
            </li>
            <li>
              <p>Ngôn ngữ</p>
              <p className={cx("detail")}>English</p>
            </li>
          </ul>
        </div>
        <UnderLine></UnderLine>
        <div className={cx("ratingDetail")} ref={targetRef}>
          <p>Chi tiết đánh giá</p>
          <div>
            <div className={cx("header")}>
              <p>Tổng</p>
              <ShowStars points={avg} />
              <h4>{avg}</h4>
            </div>
            {percent.length > 0 ? (
              renderChart()
            ) : (
              <Fragment>
                <div>
                  <RateChartItem stars={5} ratings={0} percent={0} />
                </div>
                <div>
                  <RateChartItem stars={4} ratings={0} percent={0} />
                </div>
                <div>
                  <RateChartItem stars={3} ratings={0} percent={0} />
                </div>
                <div>
                  <RateChartItem stars={2} ratings={0} percent={0} />
                </div>
                <div>
                  <RateChartItem stars={1} ratings={0} percent={0} />
                </div>
              </Fragment>
            )}
          </div>
        </div>
        <UnderLine></UnderLine>
        {feedBackList !== null ? (
          <div className={cx("allComments")}>
            <p>Các đánh giá nổi bật</p>
            <div>{renderUserComment()}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BookItem;
