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
  faXmarkCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";

import { useState } from "react";
import AvatarWrapper from "../AvatarWrapper";
import Button from "../Button";
import HeaderMenu from "../HeaderMenu";
import MenuItem from "../MenuItem";
import WrapperMenu from "../WrapperMenu";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  {
    name: "Language",
    leftIcon: <FontAwesomeIcon icon={faEarthAmerica} />,
    children: {
      title: "Language",
      data: [
        { name: "English", leftIcon: <FontAwesomeIcon icon={faE} /> },
        { name: "Vietnamese", leftIcon: <FontAwesomeIcon icon={faStar} /> },
      ],
    },
  },
  {
    name: "Themes",
    leftIcon: <FontAwesomeIcon icon={faSun} />,
    children: {
      title: "Themes",
      data: [
        { name: "Dark", leftIcon: <FontAwesomeIcon icon={faMoon} /> },
        { name: "Light", leftIcon: <FontAwesomeIcon icon={faSun} /> },
      ],
    },
  },
  {
    name: "Feedback and help",
    leftIcon: <FontAwesomeIcon icon={faQuestion} />,
  },
];

const cx = classNames.bind(style);
function Header({ userData }) {
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
        <input placeholder="Search"></input>
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
            <Button
              to
              leftIcon={<FontAwesomeIcon icon={faMessage} />}
            ></Button>
            <Button
              to
              leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
            ></Button>
            <AvatarWrapper>
              <img
                src={userData.userAvatar}
                alt="avatar"
              />
            </AvatarWrapper>
          </div>
        ) : (
          <div className={cx("actionNotLogin")}>
            <Button btnHeader primary to={"/login"}>
              Log in
            </Button>
            <Button btnHeader primary to>
              Register
            </Button>
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
