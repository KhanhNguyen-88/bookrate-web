import { faComment, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import classNames from "classnames/bind";

import Button from "../../components/Button";
import UserComment from "./components/UserComment";
import ActionBar from "./components/ActionBar";
import BookItem from "./components/BookItem";
import style from "./Home.module.scss";
import { getToken } from "../../services/localStorageService";

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
    author: "Emily Henry",
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
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userComment: "Bad book!",
      commentPublished: "10d",
      totalLikes: 2,
    },
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692118145i/195820807.jpg",
    title: "Just for the Summer",
    author: "Abby Jimenez",
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
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Hoang Tuan An",
      userComment: "Amazing book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660145160i/61718053.jpg",
    title: "Happy Place",
    author: "Emily Henry",
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
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userComment: "Good book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660145160i/61718053.jpg",
    title: "Happy Place",
    author: "Emily Henry",
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
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userComment: "Good book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
  },
];
function Home() {
  // const navigate = useNavigate();
  // const [userDetails, setUserDetails] = useState({});

  // const getUserDetails = async (accessToken) => {
  //   const response = await fetch(
  //     "http://localhost:8081/identify/myInfo",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`, // Set Authorization header
  //       },
  //     }
  //   );

  //   const data = await response.json();

  //   console.log(data);

  //   setUserDetails(data.data);
  // };

  // useEffect(() => {
  //   const accessToken = getToken();

  //   if (!accessToken) {
  //     navigate("/login");
  //   } else {
  //     getUserDetails(accessToken);
  //   }
  // }, [navigate]);

  const renderBookContainer = () => {
    return BOOK_ITEMS.map((item, index) => {
      return (
        <div className={cx("containerBook")}>
          <BookItem key={index} item={item} />
          <div className={cx("bar")}>
            <div className={cx("subBar")}>
              <li>100 Comments</li>
              <li>200 Share</li>
            </div>
            <div className={cx("actionBar")}>
              <ActionBar items={ACTION_ITEMS} />
            </div>
            <div className={cx("comment")}>
              <div className={cx("viewMoreCom")}>
                <Button to>See more comments</Button>
              </div>
              <div className={cx("firstCom")}>
                <UserComment
                  userFirstComment={item.firstComment}
                ></UserComment>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div className={cx("wrapper")}>{renderBookContainer()}</div>;
}

export default Home;
