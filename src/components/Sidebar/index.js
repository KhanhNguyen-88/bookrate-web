import {faCompass } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faRankingStar,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import AuthorItem from "../AuthorItem";
import Button from "../Button";
import MenuItem from "../MenuItem";
import UnderLine from "../UnderLine";
import style from "./Sidebar.module.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const cx = classNames.bind(style);

function Sidebar({ userData, userFollowingData }) {
  const location = useLocation();
  const [imagePre, setImagePre] = useState();

  useEffect(() => {
    if (userData && userData.userImage) {
      fetch(`http://localhost:8081/api/file/preview/${userData.userImage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Ảnh có trên cloud");
            return response.json();
          } else {
            throw new Error("Ảnh chưa có trên cloud hoặc server có lỗi.");
          }
        })
        .then((result) => {
          setImagePre(result.result);
        })
        .catch((e) => {
          console.log("Ảnh chưa có trên cloud");
        });
    }
  }, [userData]); 

  const renderUserFollowing = () => {
    return userFollowingData.map((userFollowing, index) => {
      return <AuthorItem authorInfo={userFollowing} key={index}></AuthorItem>;
    });
  };
  const SIDEBAR_ITEMS = [
    { name: "Trang Chủ", path: "/", icon: <FontAwesomeIcon icon={faHome} /> },
    {
      name: "Khám Phá",
      path: "/explore",
      icon: <FontAwesomeIcon icon={faCompass} />,
    },
    {
      name: "BXH",
      path: "/rank",
      icon: <FontAwesomeIcon icon={faRankingStar} />,
    },
    {
      name: "Cá Nhân",
      path: "/user/profile",
      icon: userData ? (
        <img src={imagePre} alt="avatar"></img>
      ) : (
        <FontAwesomeIcon icon={faUser} />
      ),
    },
  ];
  const renderMenuItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <li key={index}>
          <MenuItem
            sidebarItem
            className={cx("sidebarItem")}
            key={index}
            to={item.path}
            leftIcon={item.icon}
            nameItem={item.name}
            active={location.pathname === item.path ? true : false}
          ></MenuItem>
        </li>
      );
    });
  };
  return (
    <div className={cx("wrapper")}>
      <ul className={cx("menu")}>
        {renderMenuItems()}
        <UnderLine />
      </ul>
      {userData ? (
        <div className={cx("following")}>
          <h5>Đang theo dõi</h5>
          <ul className={cx("userFollowing")}>{renderUserFollowing()}</ul>
          <UnderLine />
        </div>
      ) : (
        <div className={cx("loginTip")}>
          <h5>Hãy đăng nhập để có trải nghiệm tốt hơn</h5>
          <Button
            primary
            to={"/login"}
            leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
          >
            Đăng nhập
          </Button>
          <UnderLine />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
