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

function Sidebar({ userData, userFollowingData}) {
  
  const renderUserFollowing = () =>{
    return userFollowingData.map((userFollowing, index)=>{
      return <UserItem userFollowing={userFollowing} key={index}></UserItem>
    })
  }
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
      icon: userData ? <img src={userData.userAvatar}></img> : <FontAwesomeIcon icon={faUser} /> ,
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
      {userFollowingData ? (
        <div className = {cx("following")}>
          <h5>Following account</h5>
          <ul className = {cx("userFollowing")}>
            {renderUserFollowing()}
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
