import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./BookReviewItem.module.scss";
import Button from "../../../../../../components/Button";
import { Fragment } from "react";
import UserItem from "../../../../../../components/UserItem";
import { getToken } from "../../../../../../services/localStorageService";

const cx = classNames.bind(style);

function BookReviewItem({ item }) {
  const [categories, setCategories] = useState([]);
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
  const handleAccept = async (bookId) => {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8081/api/book/admin-approve/${bookId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (result.code === 200) {
      alert("Duyệt thành công");
    }
  };
   const handleCancel = async (bookId) => {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8081/api/book/admin-cancel/${bookId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (result.code === 200) {
      alert("Sách đã bị hủy");
    }
  };
  return (
    <Fragment>
      <div className={cx("bookWrapper")}>
        <div className={cx("book")}>
          <div className={cx("thumbnail")}>
            <img
              src={`http://localhost:9000/image-book-rate/${item.bookResponse.bookImage}`}
              alt="book-img"
            />
          </div>
          <div className={cx("info")}>
            <div className={cx("creator")}>
              <UserItem
                userImage={item.bookResponse.userImage}
                userName={item.bookResponse.createdBy}
              />
              <p>
                {new Date(item.bookResponse.createdAt)
                  .toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "UTC", // hoặc bỏ nếu muốn giờ local
                  })
                  .replace(",", "")}
              </p>
            </div>
            <h3 className={cx("title")}>{item.bookResponse.bookName}</h3>
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
            <div className={cx("btnAccept")}>
              <Button
                primary
                onClick={() => handleAccept(item.bookResponse.id)}
              >
                Duyệt
              </Button>
              <Button
                primary
                onClick={() => handleCancel(item.bookResponse.id)}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BookReviewItem;
