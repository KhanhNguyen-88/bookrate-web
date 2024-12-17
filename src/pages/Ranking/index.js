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

        // Fetch profile data
        const userResponse = await fetch(
          "http://localhost:8081/api/user/detail-by-token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user profile. Status: ${userResponse.status}`
          );
        }

        const userResult = await userResponse.json();
        const userData = userResult.result;

        //fetch my book
        const myBooksResponse = await fetch(
          `http://localhost:8081/api/book/get-posted-by-username/${userData.userName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!myBooksResponse.ok) {
          throw new Error(
            `Failed to fetch books. Status: ${myBooksResponse.status}`
          );
        }

        const myBookResult = await myBooksResponse.json();
        setMyPosts(myBookResult.result);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);
  return (
      <TopTenCarousel books={myPosts} />
  );
}

export default Ranking;
