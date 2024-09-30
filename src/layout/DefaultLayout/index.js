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
  const USER_FOLLOW_ITEMS = [
    {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userSlogan: "find happy time!",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Header userData={USER_DATA} />
      </div>
      <div className={cx("content")}>
        <div className={cx("sidebar")}>
          <Sidebar userData={USER_DATA} userFollowingData={USER_FOLLOW_ITEMS} />
        </div>
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
