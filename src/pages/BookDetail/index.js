import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./BookDetail.module.scss";
import BookItem from "./components/BookItem";
import { getToken } from "../../services/localStorageService";

const cx = classNames.bind(style);
function BookDetail() {
  const [data, setData] = useState([]);
  const [feedBacks, setFeedbacks] = useState([]);
  const { id } = useParams();
  console.log(id);
  const [userId, setUserId] = useState();
  const paramsUserId = {
    userId: userId,
  };
  const queryUserIdString = new URLSearchParams(paramsUserId).toString();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = getToken();
        const response = await fetch("http://localhost:8081/api/user/get-id-by-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set the content type to JSON
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        setUserId(result.result);
        console.log(result.result);
      } catch (error) {
        console.error("Lỗi khi lấy userId:", error);
      }
    };
  
    fetchUserId();
  }, []);
  useEffect(() => {
    const token = getToken();
    fetch(`http://localhost:8081/api/book/detail-with-userid/${id}?${queryUserIdString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result.result.bookResponse);
        setFeedbacks(result.result.feedbackResponseList !== null ? result.result.feedbackResponseList: [] ); 
      });
  }, [id, userId]);
  return (
    <div className={cx("wrapper")}>
      <BookItem item={data} feedBackList={feedBacks} />
    </div>
  );
}

export default BookDetail;
