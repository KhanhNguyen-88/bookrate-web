import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faE,
  faEarthAmerica,
  faEllipsisV,
  faMessage,
  faMoon,
  faPaperPlane,
  faQuestion,
  faSearch,
  faSpinner,
  faSun,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useState } from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../services/authenticationService";
import AvatarWrapper from "../AvatarWrapper";
import Button from "../Button";
import HeaderMenu from "../HeaderMenu";
import MenuItem from "../MenuItem";
import WrapperMenu from "../WrapperMenu";
import style from "./Header.module.scss";

const MENU_ITEMS = [
  {
    name: "Ngôn ngữ",
    leftIcon: <FontAwesomeIcon icon={faEarthAmerica} />,
    children: {
      title: "Ngôn ngữ",
      data: [
        { name: "Tiếng Anh", leftIcon: <FontAwesomeIcon icon={faE} /> },
        { name: "Tiếng Việt", leftIcon: <FontAwesomeIcon icon={faStar} /> },
      ],
    },
  },
  {
    name: "Chế độ nền",
    leftIcon: <FontAwesomeIcon icon={faSun} />,
    children: {
      title: "Nền",
      data: [
        { name: "Tối", leftIcon: <FontAwesomeIcon icon={faMoon} /> },
        { name: "Sáng", leftIcon: <FontAwesomeIcon icon={faSun} /> },
      ],
    },
  },
  {
    name: "Hỏi đáp",
    leftIcon: <FontAwesomeIcon icon={faQuestion} />,
  },
];

const cx = classNames.bind(style);
function Header({ userData, logout}) {
  const [history, setHistory] = useState([{ data: MENU_ITEMS }]);
  const lastItem = history[history.length - 1];
  const renderMenuItems = () => {
    return lastItem.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            }
          }}
          key={index}
          nameItem={item.name}
          leftIcon={item.leftIcon}
        ></MenuItem>
      );
    });
  };
  //
  const onBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };
  const renderHeaderMenu = () => {
    return <HeaderMenu title={lastItem.title} onClick={onBack} />;
  };
  const handleLogout =()=>{
    logOut(); // remove token
    logout();// re-render layout
  }
  //
  return (
    <div className={cx("wrapper")}>
      <div className={cx("logo")}>
        <Link to={"/"}>
          <img
            src="https://s.gr-assets.com/assets/layout/header/goodreads_logo.svg"
            alt="logo"
          ></img>
        </Link>
      </div>
      <div className={cx("search")}>
        <input placeholder="Tìm kiếm sách!..."></input>
        <span className={cx("searchIcon")}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </span>
        <span className={cx("line")}></span>
        <span className={cx("loadIcon")}>
          <FontAwesomeIcon icon={faSpinner} />
        </span>
        <span className={cx("clearIcon")}>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </span>
      </div>
      <div className={cx("action")}>
        {userData ? (
          <div className={cx("actionLogin")}>
            <Button to leftIcon={<FontAwesomeIcon icon={faMessage} />}></Button>
            <Button
              to
              leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            ></Button>
            <AvatarWrapper>
              <Tippy
                delay={[0, 500]}
                interactive
                render={() => {
                  return (
                    <div>
                      <ul>
                        <li onClick={handleLogout}>Logout</li>
                      </ul>
                    </div>
                  );
                }}
              >
                <img src={userData.userAvatar} alt="avatar" />
              </Tippy>
            </AvatarWrapper>
          </div>
        ) : (
          <div className={cx("actionNotLogin")}>
            <li>
              <Button btnHeader to={"/login"}>
                Đăng nhập
              </Button>
            </li>
            <li>
              <Button btnHeader to={"/register"}>
                Đăng ký
              </Button>
            </li>
            <Tippy
              delay={[0, 500]}
              // visible
              interactive
              render={() => {
                return (
                  <WrapperMenu>
                    {history.length > 1 && renderHeaderMenu()}
                    {renderMenuItems()}
                  </WrapperMenu>
                );
              }}
            >
              <span className={cx("moreMenu")}>
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
            </Tippy>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
