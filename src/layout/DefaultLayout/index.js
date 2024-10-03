import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/localStorageService";

import { Header, Sidebar } from "../../components";
import style from "./DefaultLayout.module.scss";

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  //   const navigate = useNavigate();
  //   const [userDetails, setUserDetails] = useState({});

  //   const getUserDetails = async (accessToken) => {
  //     const response = await fetch("http://localhost:8081/identify/myInfo", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`, // Set Authorization header
  //       },
  //     });

  //     const data = await response.json();

  //     console.log(data);

  //     setUserDetails(data.data);
  //   };

  //   useEffect(() => {
  //     const accessToken = getToken();

  //     if (!accessToken) {
  //       navigate("/login");
  //     } else {
  //       getUserDetails(accessToken);
  //     }
  //   }, [navigate]);
  const USER_DATA = {
    userName: "Nguyen Van Khanh",
    userAvatar:
      "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
  };
  const AUTHOR_FOLLOWING_ITEMS = [
    {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/user/u_700x933.png",
      name: "BookRags",
      totalBooks: 17,
     
    },
    {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1651706989i/18446724._UX200_CR0,26,200,200_.jpg",
      name: "Abby Jimenez",
      totalBooks: 17,
    },
    {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      name: "Emily Henry",
      totalBooks: 17,
     
    },
    {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1701487498i/7244758._UX200_CR0,4,200,200_.jpg",
      name: "Freida McFadden",
      totalBooks: 17,
     
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Header userData={USER_DATA} />
      </div>
      <div className={cx("content")}>
        <div className={cx("sidebar")}>
          <Sidebar userData={USER_DATA} userFollowingData={AUTHOR_FOLLOWING_ITEMS} />
        </div>
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
