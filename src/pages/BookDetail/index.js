import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./BookDetail.module.scss";
import BookItem from "./components/BookItem";

const cx = classNames.bind(style);
function BookDetail() {
  const [data, setData] = useState([]);
  const [feedBacks, setFeedbacks] = useState([]);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:8081/api/book/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result.result.bookResponse);
        setFeedbacks(result.result.feedbackResponseList);
      });
  }, [id]);
  return (
    <div className={cx("wrapper")}>
      <BookItem item={data} feedBackList={feedBacks} />
      <div></div>
    </div>
  );
}

export default BookDetail;
