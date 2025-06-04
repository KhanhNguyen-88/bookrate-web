import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faE,
  faEarthAmerica,
  faEllipsisV,
  faMoon,
  faPlus,
  faQuestion,
  faRightFromBracket,
  faSearch,
  faSun,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../services/authenticationService";
import AvatarWrapper from "../AvatarWrapper";
import Button from "../Button";
import HeaderMenu from "../HeaderMenu";
import MenuItem from "../MenuItem";
import WrapperMenu from "../WrapperMenu";
import style from "./Header.module.scss";
import ItemBookSearch from "../ItemBookSearch";
import CreatePost from "../../pages/CreatePost";
import Popup from "reactjs-popup";
import UpdateProfile from "../../pages/UpdateProfile";
import { Navigate } from "react-router-dom";

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
function Header({ userData, reRender }) {
  const [history, setHistory] = useState([{ data: MENU_ITEMS }]);
  const lastItem = history[history.length - 1];
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [data, setData] = useState();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupProfile, setPopupProfile] = useState(false);
  const [imagePre, setImagePre] = useState();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      navigate("/"); // Quay lại trang chủ
      logOut(); // Xóa token
      reRender(); // Re-render layout
    }
  };

  const handleChangeInput = (e) => {
    setSearchTerm(e.target.value);
    if (!e.target.value.trim()) {
      setSearchTerm(null);
      setSuggestions([]);
    } else {
      setSuggestions(data);
    }
  };

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

  useEffect(() => {
    if(searchTerm !== ""){
    fetch(`http://localhost:8081/api/book/search-common/${searchTerm}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setData(result.result);
      });   
    }
  }, [searchTerm]);


  const handleClearSearch = () => {
    console.log("click");
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleClosePopup = (close) => {
    const confirmClose = window.confirm(
      "Bạn có chắc chắn muốn hủy bài viết đang tạo?"
    );
    if (confirmClose) {
      close(); // Thực sự đóng popup nếu người dùng xác nhận
    }
  };

  const handleShowInfo = () => {
    setPopupProfile(true);
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
        <Tippy
          placement="bottom"
          visible={suggestions.length > 0}
          interactive
          render={() => {
            return suggestions.length > 0 ? (
              <ul className={cx("wrapperSug")}>
                <p>Gợi ý sách</p>
                {suggestions.map((item, index) => (
                  <ItemBookSearch
                    key={index}
                    item={item}
                    onClick={
                     ()=> setSuggestions([]) // Xóa gợi ý sau khi chọn
                    }
                  />
                ))}
              </ul>
            ) : null; // Không render gì nếu không có gợi ý
          }}
        >
          <input
            placeholder="Tìm kiếm sách!..."
            value={searchTerm}
            onChange={(e) => handleChangeInput(e)}
          ></input>
        </Tippy>
        <span className={cx("searchIcon")}>
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </span>
        <span className={cx("line")}></span>
        {/* <span className={cx("loadIcon")}>
          <FontAwesomeIcon icon={faSpinner} />
        </span> */}
        { suggestions.length > 0 || (searchTerm !== undefined && searchTerm !== "") ? (<span className={cx("clearIcon")} onClick={handleClearSearch}>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </span>) : <p></p>}
      </div>
      <div className={cx("action")}>
        {userData ? (
          <div className={cx("actionLogin")}>
            <div>
              <Button
                onClick={() => setOpenPopup(true)}
                leftIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                Tải lên
              </Button>
            </div>
            <Popup
              open={openPopup} // Kiểm soát mở popup qua trạng thái
              onClose={() => setOpenPopup(false)} // Đóng popup
              closeOnDocumentClick={false}
              modal
              nested
            >
              {(close) => (
                <div className={cx("createPost")}>
                  <Button
                    className="close"
                    onClick={() => handleClosePopup(close)}
                  >
                    &times;
                  </Button>
                  <CreatePost handleClose={close} />
                </div>
              )}
            </Popup>
            <Popup
              open={popupProfile} // Kiểm soát mở popup qua trạng thái
              onClose={() => setPopupProfile(false)} // Đóng popup
              // closeOnDocumentClick={false}
              modal
              nested
            >
              {(close) => (
                <div className={cx("updateProfile")}>
                  <Button className="close" onClick={close}>
                    &times;
                  </Button>
                  <div>
                    <UpdateProfile />
                  </div>
                </div>
              )}
            </Popup>
            
            <AvatarWrapper>
              <Tippy
                delay={[0, 500]}
                interactive
                render={() => {
                  return (
                    <div className={cx("wrapperProfile")}>
                      <ul>
                        <Button
                          primary
                          onClick={handleLogout}
                          leftIcon={
                            <FontAwesomeIcon icon={faRightFromBracket} />
                          }
                        >
                          Logout
                        </Button>
                        <li
                          className={cx("btnProfile")}
                          onClick={() => handleShowInfo()}
                        >
                          <p>Cá nhân</p>
                        </li>
                      </ul>
                    </div>
                  );
                }}
              >
                <img src={`http://localhost:9000/image-book-rate/${userData.userImage}`} alt="avatar" />
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
