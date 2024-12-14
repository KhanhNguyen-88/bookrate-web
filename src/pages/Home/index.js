import { faComment, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import Button from "../../components/Button";
import UserComment from "./components/UserComment";
import ActionBar from "./components/ActionBar";
import BookItem from "./components/BookItem";
import style from "./Home.module.scss";
import { getToken } from "../../services/localStorageService";
import UnderLine from "../../components/UnderLine";
import PaginatedItems from "./components/PaginatedItems";

const cx = classNames.bind(style);
const ACTION_ITEMS = [
  { icon: <FontAwesomeIcon icon={faComment} />, data: "Comments" },
  { icon: <FontAwesomeIcon icon={faShareNodes} />, data: "Share" },
];
const BOOK_ITEMS = [
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660145160i/61718053.jpg",
    title: "Happy Place",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      name: "Emily Henry",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "Harriet and Wyn have been the perfect couple since they met in college—they go together like salt and pepper, honey and tea, lobster and rolls. Except, now—for reasons they’re still not discussing—they don’t.",
    points: "3.9",
    ratings: "1,053,411 ",
    reviews: "125,789",
    awards: ["Winner for Best Romance (2023)"],
    genres: ["Romance", "Fiction", "AudioBook"],
    format: "400 pages, Hardcover",
    published: "April 25, 2023 by Berkley",
    ISBN: "9780593441275 ",
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      userName: "Nguyen Van Khanh",
      userComment: "Bad book!",
      commentPublished: "10d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692118145i/195820807.jpg",
    title: "Just for the Summer",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1651706989i/18446724._UX200_CR0,26,200,200_.jpg",
      name: "Abby Jimenez",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "Justin has a curse, and thanks to a Reddit thread, it's now all over the internet. Every woman he dates goes on to find their soul mate the second they break up. When a woman slides into his DMs with the same problem, they come up with a plan: They'll date each other and break up. Their curses will cancel each other’s out, and they’ll both go on to find the love of their lives. It’s a bonkers idea… and it just might work.",
    points: "4.40",
    ratings: "67,865",
    reviews: "463,982 ",
    awards: [],
    genres: ["Romance", "Fiction", "AudioBook"],
    format: "432 pages, Paperback",
    published: "First published April 2, 2024",
    ISBN: null,
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      userName: "Hoang Tuan An",
      userComment: "Amazing book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664729357i/62848145.jpg",
    title: "The Housemaid's Secret",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1701487498i/7244758._UX200_CR0,4,200,200_.jpg",
      name: "Freida McFadden",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "As he continues showing me their incredible penthouse apartment, I have a terrible feeling about the woman behind closed doors. But I can't risk losing this job – not if I want to keep my darkest secret safe . . .",
    points: "4.6",
    ratings: "799,971",
    reviews: "55,172",
    awards: ["Winner for Best Mystery & Thriller (2023)"],
    genres: ["Romance", "Fiction", "AudioBook"],
    format: "318 pages, Kindle Edition",
    published: "February 20, 2023 by Bookouture",
    ISBN: "9781837901319",
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      userName: "Nguyen Van Khanh",
      userComment: "Good book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1394264018i/21094869.jpg",
    title: "The Lovely Bones",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/user/u_700x933.png",
      name: "BookRags",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "The 'The Lovely Bones' lesson plan contains a variety of teaching materials that cater to all learning styles. Inside you'll find 30 Daily Lessons, 20 Fun Activities, 180 Multiple Choice Questions, 60 Short Essay Questions, 20 Essay Questions, Quizzes/Homework Assignments, Tests, and more.",
    points: "3.0",
    ratings: "3",
    reviews: "0",
    awards: [""],
    genres: ["Education"],
    format: "347 pages, Kindle Edition",
    published: "January 11, 2012",
    ISBN: "",
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      userName: "Nguyen Van Khanh",
      userComment: "Good book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
];
function Home() {
  const { id } = useParams();
  console.log(id);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserIdAndConnectSSE = async () => {
      try {
        // Lấy token
        const token = getToken();
  
        // Gọi API để lấy userId
        const response = await fetch("http://localhost:8081/api/user/get-id-by-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        const userId = result.result;
        setUserId(userId);
        console.log(userId);
  
        // Khởi tạo SSE với userId
        const eventSource = new EventSource(
          `http://localhost:8081/api/book/stream/${userId}`
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
      } catch (error) {
        console.error("Lỗi khi lấy userId hoặc kết nối SSE:", error);
      }
    };
  
    fetchUserIdAndConnectSSE();
  }, []);
  
  
  // useEffect(() => {
    
  // }, [userId]);

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
