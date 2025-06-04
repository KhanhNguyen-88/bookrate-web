import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./BookDetail.module.scss";
import BookItem from "./components/BookItem";
import { getToken } from "../../services/localStorageService";
import TopTenCarousel from "./components/TopTenCarousel";

const cx = classNames.bind(style);

function BookDetail() {
  const [data, setData] = useState([]);
  const [feedBacks, setFeedbacks] = useState([]);
  const [percent, setPercent] = useState([]);
  const { id } = useParams();
  const [userId, setUserId] = useState();
  const [author, setAuthor] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Lấy userId
        const token = getToken();
        const userResponse = await fetch(
          "http://localhost:8081/api/user/get-id-by-token",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const userResult = await userResponse.json();
        const userId = userResult.result;
        setUserId(userId);
        //
        // const myBooksResponse = await fetch(
        //   `http://localhost:8081/api/book/ranking-favorite`
        // );

        // if (!myBooksResponse.ok) throw new Error("Error fetching books");

        // const myBookResult = await myBooksResponse.json();
        // setMyPosts(myBookResult.result);

        // Lấy chi tiết sách và feedback
        const queryUserIdString = new URLSearchParams({ userId }).toString();
        const bookResponse = await fetch(
          `http://localhost:8081/api/book/detail-with-userid/${id}?${queryUserIdString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (!bookResponse.ok) {
          throw new Error(`HTTP error! Status: ${bookResponse.status}`);
        }

        const bookResult = await bookResponse.json();
        setData(bookResult.result.bookResponse);
        setFeedbacks(
          bookResult.result.feedbackResponseList !== null
            ? bookResult.result.feedbackResponseList
            : []
        );
        setPercent(
          bookResult.result.percentFeedbackList !== null
            ? bookResult.result.percentFeedbackList
            : []
        );
        setAuthor(bookResult.result.bookResponse.bookAuthor);
        const categoryString = bookResult.result.bookResponse.categoryName; // "Kinh dị, Kinh dị"
        const categoryArray = categoryString.split(",").map((s) => s.trim()); // ✅ tách và xoá khoảng trắng
        setCategoryNames(categoryArray);
        // Tạo query string
        const params = new URLSearchParams();
        params.append("author", bookResult.result.bookAuthor);
        categoryArray.forEach((name) => params.append("categoryNames", name));

        const response = await fetch(
          `http://localhost:8081/api/book/get-book-relation?${params.toString()}`
        );

        if (!response.ok) throw new Error("Error fetching book relations");

        const result = await response.json();
        console.log(result)
        setMyPosts(result.result)
      } catch (error) {
        console.error("Lỗi khi fetch data:", error);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <Fragment>
      <div className={cx("wrapper")}>
        <BookItem item={data} feedBackList={feedBacks} percent={percent} />
        <div className={cx("guess")}>
          <h4></h4>
          <div>
            <h5>Sách cùng tác giả và liên quan</h5>
            <TopTenCarousel books={myPosts}></TopTenCarousel>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default BookDetail;
