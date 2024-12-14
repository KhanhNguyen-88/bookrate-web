import { useState, useEffect } from "react";
import BookItem from "../../../Home/components/BookItem";
import BookReviewItem from "./component/BookReviewItem";
import classNames from "classnames/bind";
import style from "./ReviewBook.module.scss";

const cx = classNames.bind(style);
function ReviewBook() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8081/api/book/stream-admin-page`
    );

    const handleEvent = (event) => {
      console.log("Dữ liệu nhận được từ SSE:", event.data);

      try {
        const data = JSON.parse(event.data);
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Dữ liệu không hợp lệ hoặc không phải mảng", data);
        }
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu SSE:", error);
      }
    };

    eventSource.addEventListener("post-list-event", handleEvent);

    // Cleanup khi component unmount
    return () => {
      eventSource.close();
      console.log("SSE connection closed");
    };
  }, []);

  const renderBook = () => {
    return books.map((item, index) => {
      return <BookReviewItem key={index} item={item} />;
    });
  };
  return (
    <div className={cx("wrapperAllBooks")}>
      {books.length > 0 ? renderBook() : <div>Không có sách cần duyệt</div>}
    </div>
  );
}

export default ReviewBook;
