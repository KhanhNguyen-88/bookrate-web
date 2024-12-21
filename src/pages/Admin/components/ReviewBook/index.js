import { useState, useEffect } from "react";
import BookReviewItem from "./component/BookReviewItem";
import classNames from "classnames/bind";
import style from "./ReviewBook.module.scss";

const cx = classNames.bind(style);

function ReviewBook() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [booksPerPage] = useState(2); // Số sách mỗi trang

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

  // Tính toán các sách sẽ hiển thị trong trang hiện tại
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const renderBook = () => {
    return currentBooks.map((item, index) => {
      return <BookReviewItem key={index} item={item} />;
    });
  };

  // Chuyển sang trang tiếp theo
  const nextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Chuyển sang trang trước đó
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {books.length > 0 ? (
        <div className={cx("wrapperAllBooks")}>
          {renderBook()}
          <div className={cx("pagination")}>
            <button
              className={cx("paginationButton")}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className={cx("paginationText")}>
              Page {currentPage} of {Math.ceil(books.length / booksPerPage)}
            </span>
            <button
              className={cx("paginationButton")}
              onClick={nextPage}
              disabled={currentPage === Math.ceil(books.length / booksPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className={cx("noneContent")}>Không có sách cần duyệt</div>
      )}
    </div>
  );
}

export default ReviewBook;
