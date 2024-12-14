import { useEffect, useState } from "react";
import { getToken } from "../../services/localStorageService";
import classNames from "classnames/bind";
import ProfileMenu from "../User/component/ProfileMenu";
import style from "./Profile.module.scss";
import Button from "../../components/Button";
import Popup from "reactjs-popup";
import AuthorItem from "../User/component/AuthorItem";
import { Navigate, useNavigate } from "react-router-dom";

const cx = classNames.bind(style);
function Profile() {
  const [profileData, setProfileData] = useState({});
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupFollowing, setOpenPopupFollowing] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState();
  const [imagePre, setImagePre] = useState();

  const token = getToken();

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:8081/api/user/detail-by-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setProfileData(result.result);
          console.log(token);
          console.log(result.result);
        });
    }
  }, [token]);
  
  useEffect(() => {
      if (profileData && profileData.userImage) {
        fetch(`http://localhost:8081/api/file/preview/${profileData.userImage}`, {
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
    }, [profileData]);  

  useEffect(() => {
    fetch(
      `http://localhost:8081/api/book/get-book-by-userId/${profileData.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFavoriteBooks(result.result);
        console.log(result.result);
      });
    // }
  }, [profileData.id]);

  const handleOpenFollower = () => {

    fetch(`http://localhost:8081/api/user/follower-account-by-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFollower(result.result);
        console.log(result);
      });

      setOpenPopup(true);
  };

  const handleOpenFollowing = () => {
    fetch(`http://localhost:8081/api/user/following-account-by-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFollowing(result.result);
        console.log(result);
      });
      
      setOpenPopupFollowing(true);
  };

  const renderUserFollow = (follow) => {
    return follow.map((item, index) => {
      return <AuthorItem authorInfo={item} key={index} />;
    });
  };

  return !token ? <Navigate to={"/login"}/> :
    <div className={cx("wrapper")}>
      <div className={cx("wrapperUserInfo")}>
        <img src={imagePre} alt="avatar"></img>
        <div>
          <div className={cx("action")}>
            <h2 className={cx("userName")}>{profileData.userName}</h2>
            {/* <Button primary>Theo dõi</Button> */}
          </div>
          <ul className={cx("info")}>
            <li>
              <strong>1</strong>
              <Button>Bài viết</Button>
            </li>
            <li>
              <strong>{profileData.followerAccounts}</strong>
              <Button to onClick={handleOpenFollower}>
                Follower
              </Button>
            </li>
            <Popup
              open={openPopup} // Kiểm soát mở popup qua trạng thái
              onClose={() => setOpenPopup(false)} // Đóng popup
              modal
              nested
            >
              {(close) => (
                <div className={cx("wrapperPopup")}>
                  <button className={cx("btnClose")} onClick={close}>
                    {" "}
                    &times;
                  </button>
                  <h2>Follower</h2>
                  <div>
                    {follower.length > 0 ? (
                      renderUserFollow(follower)
                    ) : (
                      <p>Không có dữ liệu</p>
                    )}
                  </div>
                </div>
              )}
            </Popup>
            <li>
              <Button to onClick={handleOpenFollowing}>
                Theo dõi
              </Button>
              <strong>{profileData.followingAccounts}</strong>
            </li>
            <Popup
              open={openPopupFollowing} // Kiểm soát mở popup qua trạng thái
              onClose={() => setOpenPopupFollowing(false)} // Đóng popup
              modal
              nested
            >
              {(close) => (
                <div className={cx("wrapperPopup")}>
                  <button className={cx("btnClose")} onClick={close}>
                    {" "}
                    &times;
                  </button>
                  <h2>Đang Follow</h2>
                  <div>
                    {following.length > 0 ? (
                      renderUserFollow(following)
                    ) : (
                      <p>Không có dữ liệu</p>
                    )}
                  </div>
                </div>
              )}
            </Popup>
          </ul>
          <p className={cx("desc")}>Follow me!</p>
        </div>
      </div>
      <div className={cx("wrapperMoreInfo")}>
        <div className={cx("lineAction")}></div>
        <ul className={cx("menu")}>
          <ProfileMenu dataLove={favoriteBooks} />
        </ul>
      </div>
    </div>
}

export default Profile;
