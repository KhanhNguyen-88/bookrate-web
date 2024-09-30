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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Header/>
      </div>
      <div className={cx("content")}>
        <div className={cx("sidebar")}>
          <Sidebar />
        </div>
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
