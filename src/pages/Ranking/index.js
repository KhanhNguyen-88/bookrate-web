import TopTenCarousel from "./TopTenCarousel";
import { getToken } from "../../services/localStorageService";
import { useEffect, useState } from "react";
import styles from "./Ranking.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Ranking() {
  const [myPosts, setMyPosts] = useState([]);

  const token = getToken();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token) return;

        const userResponse = await fetch(
          "http://localhost:8081/api/user/detail-by-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) throw new Error("Error fetching user data");

        const userResult = await userResponse.json();
        const myBooksResponse = await fetch(
          `http://localhost:8081/api/book/ranking-favorite`
        );

        if (!myBooksResponse.ok) throw new Error("Error fetching books");

        const myBookResult = await myBooksResponse.json();
        setMyPosts(myBookResult.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  return (
    <div className = {cx("wrapper")}>
      <TopTenCarousel books={myPosts} title={"Top 10 sách xu hướng"}/>
      <TopTenCarousel books={myPosts} title={"Top 10 sách Mùa Xuân 2024"}/>
      <TopTenCarousel books={myPosts} title={"Top 10 sách Mùa Hè 2024"}/>
      <TopTenCarousel books={myPosts} title={"Top 10 sách Mùa Thu 2024"}/>
      <TopTenCarousel books={myPosts} title={"Top 10 sách Mùa Đông 2024"}/>
    </div>
  );
}

export default Ranking;
