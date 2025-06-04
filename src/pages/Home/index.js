import { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./Home.module.scss";
import { getToken, removeToken } from "../../services/localStorageService";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import BookItem from "../Home/components/BookItem";

const cx = classNames.bind(style);

function Home() {
  const [books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [itemsPerLoad] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const eventSourceRef = useRef(null);
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUserIdAndConnectSSE = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/user/get-id-by-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            removeToken();
            navigate("/login");
          }
          return;
        }

        const result = await response.json();
        const userId = result.result;

        if (!eventSourceRef.current) {
          const eventSource = new EventSource(
            `http://localhost:8081/api/book/stream/${userId}`
          );

          eventSource.addEventListener("post-list-event", (event) => {
            try {
              const data = JSON.parse(event.data);
              if (Array.isArray(data)) {
                setBooks((prevBooks) => {
                  const isChanged =
                    JSON.stringify(prevBooks) !== JSON.stringify(data);
                  if (isChanged) {
                    const firstBooks = data.slice(0, itemsPerLoad);
                    setDisplayedBooks(firstBooks);
                    setHasMore(data.length > firstBooks.length);
                    return data;
                  }
                  return prevBooks;
                });
              }
            } catch (error) {
              console.error("Lỗi khi parse dữ liệu SSE:", error);
            }
          });

          eventSource.onopen = () => {
            console.log("SSE connection established");
          };

          eventSource.onerror = (error) => {
            console.error("SSE connection error:", error);
          };

          eventSourceRef.current = eventSource;
        }
      } catch (error) {
        console.error("Lỗi khi lấy userId hoặc kết nối SSE:", error);
      }
    };

    fetchUserIdAndConnectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("SSE connection closed");
        eventSourceRef.current = null;
      }
    };
  }, [token, navigate]);

  const fetchMoreBooks = () => {
    const nextBooks = books.slice(
      displayedBooks.length,
      displayedBooks.length + itemsPerLoad
    );

    const updatedDisplayed = [...displayedBooks, ...nextBooks];
    setDisplayedBooks(updatedDisplayed);

    if (updatedDisplayed.length >= books.length) {
      setHasMore(false);
    }
  };

  return (
    <div className={cx("containerBook")}>
      <InfiniteScroll
        dataLength={displayedBooks.length}
        next={fetchMoreBooks}
        hasMore={hasMore}
        loader={<h4>Đang tải thêm sách...</h4>}
        // endMessage={<p>Đã hiển thị tất cả sách.</p>}
      >
        {displayedBooks.map((book) => (
          <BookItem key={book.id} item={book} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Home;
