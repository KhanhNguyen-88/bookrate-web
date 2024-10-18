import { faAddressBook, faCompass } from "@fortawesome/free-regular-svg-icons";
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

const cx = classNames.bind(style);

function Sidebar({ userData, userFollowingData }) {
  const location = useLocation();
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
      name: "Yêu Thích",
      path: "/follow",
      icon: <FontAwesomeIcon icon={faAddressBook} />,
    },
    {
      name: "BXH",
      path: "/rank",
      icon: <FontAwesomeIcon icon={faRankingStar} />,
    },
    {
      name: "Cá Nhân",
      path: "/profile",
      icon: userData ? (
        <img src={userData.userAvatar} alt="avatar"></img>
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
          <h5>Tác giả đang theo dõi</h5>
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
