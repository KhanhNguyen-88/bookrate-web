import { faAddressBook, faCompass } from "@fortawesome/free-regular-svg-icons";
import {
  faHome,
  faRankingStar,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../Button";
import MenuItem from "../MenuItem";
import UnderLine from "../UnderLine";
import style from "./Sidebar.module.scss";
import UserItem from "../UserItem";

const cx = classNames.bind(style);

function Sidebar({ userData }) {
  const SIDEBAR_ITEMS = [
    { name: "Home", path: "/", icon: <FontAwesomeIcon icon={faHome} /> },
    {
      name: "Explore",
      path: "/explore",
      icon: <FontAwesomeIcon icon={faCompass} />,
    },
    {
      name: "Following",
      path: "/follow",
      icon: <FontAwesomeIcon icon={faAddressBook} />,
    },
    {
      name: "Ranking",
      path: "/rank",
      icon: <FontAwesomeIcon icon={faRankingStar} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: userData ? <img src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70" alt="avatar"></img> : <FontAwesomeIcon icon={faUser} /> ,
    },
  ];
  const renderMenuItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <li>
          <MenuItem
            sidebarItem
            className={cx("sidebarItem")}
            key={index}
            to={item.path}
            leftIcon={item.icon}
            nameItem={item.name}
          ></MenuItem>
        </li>
      );
    });
  };
  return (
    <div>
      <ul className={cx("menu")}>
        {renderMenuItems()}
        <UnderLine />
      </ul>
      {userData ? (
        <div className = {cx("following")}>
          <h5>Following account</h5>
          <ul className = {cx("userFollowing")}>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
            <UserItem/>
          </ul>
          <UnderLine/>
        </div>
      ) : (
        <div className={cx("loginTip")}>
          <h5>Log in to create and view comments</h5>
          <Button
            primary
            to={"/login"}
            leftIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
          >
            Login
          </Button>
          <UnderLine />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
