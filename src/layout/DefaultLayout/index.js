import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../services/localStorageService";

import { Header, Sidebar } from "../../components";
import style from "./DefaultLayout.module.scss";

const cx = classNames.bind(style);
function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [_, forceUpdate] = useState(); // State không sử dụng, chỉ để re-render
  const [isLogin, setIsLogin] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [following, setFollowing] = useState([]);

  const triggerReRender = () => {
    forceUpdate((prev) => !prev); // Đảo giá trị true/false để buộc re-render
  };
  const accessToken = getToken();
  useEffect(() => {
    if (!accessToken) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      fetch(`http://localhost:8081/api/user/detail-by-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setProfileData(result.result);
          console.log(accessToken);
          console.log(result.result);
        });
      fetch(`http://localhost:8081/api/user/following-account-by-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`, // Set the content type to JSON
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setFollowing(result.result);
          console.log(result);
        });
    }
  }, [_]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <Header
          userData={isLogin ? profileData : null}
          reRender={triggerReRender}
        />
        {console.log("re-ren")}
      </div>
      <div className={cx("content")}>
        <div className={cx("sidebar")}>
          <Sidebar
            userData={isLogin ? profileData : null}
            userFollowingData={following}
          />
        </div>
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
