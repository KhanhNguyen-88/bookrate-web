import TopTenCarousel from "./TopTenCarousel";
import { getToken } from "../../services/localStorageService";
import { useEffect, useState } from "react";
import styles from "./Ranking.module.scss";
import classNames from "classnames/bind";
import { Navigate, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Ranking() {
  const [myPosts, setMyPosts] = useState([]);
  const [newest, setNewest] = useState([]);
  const navigate = useNavigate();

  const token = getToken();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // if (!token) return;

        const userResponse = await fetch(
          "http://localhost:8081/api/user/detail-by-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            console.log("status", userResponse.status);
            navigate("/login");
          }
        }

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

  useEffect(() => {
    fetch(`http://localhost:8081/api/book/ranking-newest`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setNewest(result.result);
      });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <TopTenCarousel books={myPosts} title={"Top 10 sách xu hướng"} />
      <TopTenCarousel books={newest} title={"Top 10 sách mới nhất"} />
    </div>
  );
}

export default Ranking;
