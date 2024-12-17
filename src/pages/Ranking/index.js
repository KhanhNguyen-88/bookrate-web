import TopTenCarousel from "./TopTenCarousel";
import { getToken } from "../../services/localStorageService";
import { useEffect, useState } from "react";
import styles from "./Ranking.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Ranking() {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const token = getToken();
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
          `http://localhost:8081/api/book/get-posted-by-username/${userResult.result.userName}`
        );

        if (!myBooksResponse.ok) throw new Error("Error fetching books");

        const myBookResult = await myBooksResponse.json();
        setMyPosts(myBookResult.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className = {cx("wrapper")}>
      <TopTenCarousel books={myPosts} className = {cx("top")} />
      <TopTenCarousel books={myPosts} className = {cx("top")}/>
    </div>
  );
}

export default Ranking;
