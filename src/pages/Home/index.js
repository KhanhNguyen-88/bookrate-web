import { useState, useEffect } from "react";
import classNames from "classnames/bind";


import style from "./Home.module.scss";
import { getToken, removeToken } from "../../services/localStorageService";
import PaginatedItems from "./components/PaginatedItems";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

function Home() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const eventSourceRef = useRef(null); // Dùng useRef để lưu EventSource
  const location = useLocation();
  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token){
      navigate("/login")
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
            console.log("status", response.status);
            removeToken();
            navigate("/login");
          }
          // throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const userId = result.result;

        // Chỉ khởi tạo EventSource nếu chưa tồn tại
        if (!eventSourceRef.current) {
          const eventSource = new EventSource(
            `http://localhost:8081/api/book/stream/${userId}`
          );

          eventSource.addEventListener("post-list-event", (event) => {
            try {
              const data = JSON.parse(event.data);
              if (Array.isArray(data)) {
                setBooks(data);
              } else {
                console.error(
                  "Dữ liệu không hợp lệ hoặc không phải mảng",
                  data
                );
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
      // Đóng kết nối SSE khi component unmount
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("SSE connection closed");
        eventSourceRef.current = null; // Xóa tham chiếu EventSource
      }
    };
  }, []);

  const handleChangePage = (currentPage) => {
    setPage(currentPage);
  };

  return (
    <div>
      <PaginatedItems
        items={books}
        pageCount={pageCount}
        onPageChange={handleChangePage}
      ></PaginatedItems>
    </div>
  );
}

export default Home;
