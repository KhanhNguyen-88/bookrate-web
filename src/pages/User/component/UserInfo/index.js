import classNames from "classnames/bind";
import style from "./UserInfo.module.scss";
import Button from "../../../../components/Button";
import ProfileMenu from "../ProfileMenu";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthorItem from "../AuthorItem";
import { getToken } from "../../../../services/localStorageService";

const cx = classNames.bind(style);
function UserInfo() {
  const { userId } = useParams();
  console.log("userid:" + userId);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupFollowing, setOpenPopupFollowing] = useState(false);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userData, setUserData] = useState({});
  const [favoriteBooks, setFavoriteBooks] = useState();
  const [imagePre, setImagePre] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [myPosts, setMyPosts] = useState([]);
  const [unPosts, setUnPosts] = useState([]);

  useEffect(() => {
    const token = getToken();
    const fetchDataUser = async () => {
      //fetch user nae data
      const userDataResponse = await fetch(
        `http://localhost:8081/api/user/detail/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!userDataResponse.ok) {
        throw new Error(
          `Failed to fetch books. Status: ${userDataResponse.status}`
        );
      }
      const userResult = await userDataResponse.json();
      setUserData(userResult.result);
      setIsFollowed(userResult.result.isFollowing);
      console.log("Follow status", userResult.result.isFollowing);
      //fetch my book
      const myBooksResponse = await fetch(
        `http://localhost:8081/api/book/get-posted-by-username/${userResult.result.userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!myBooksResponse.ok) {
        throw new Error(
          `Failed to fetch books. Status: ${myBooksResponse.status}`
        );
      }

      const myBookResult = await myBooksResponse.json();
      setMyPosts(myBookResult.result);
    };
    fetchDataUser();
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:8081/api/book/get-book-by-userId/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFavoriteBooks(result.result);
        console.log(result.result);
      });
    // }
  }, [userId]);
  useEffect(() => {
    fetch(`http://localhost:8081/api/book/get-book-unapprove/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setUnPosts(result.result);
        console.log(result.result);
      });
    // }
  }, [userId]);

  const handleOpenFollower = () => {
    const token = getToken();

    setOpenPopup(true);
    fetch(`http://localhost:8081/api/user/follower-account/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFollower(result.result);
        console.log(result);
      });
  };

  const handleOpenFollowing = () => {
    const token = getToken();

    setOpenPopupFollowing(true);
    fetch(`http://localhost:8081/api/user/following-account/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setFollowing(result.result);
        console.log(result);
      });
  };

  const renderUserFollow = (follow) => {
    return follow.map((item, index) => {
      return <AuthorItem authorInfo={item} key={index} />;
    });
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

  const handleUnFollow = (id) => {
    const token = getToken();
    fetch(`http://localhost:8081/api/user/unfollow-account/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });

    setIsFollowed(false);
  };

  const handleFollow = (id) => {
    const token = getToken();
    fetch(`http://localhost:8081/api/user/follow-account/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`, // Set the content type to JSON
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
      });
    setIsFollowed(true);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperUserInfo")}>
        <img
          src={`http://localhost:9000/image-book-rate/${userData.userImage}`}
          alt="avatar"
        ></img>
        <div>
          <div className={cx("action")}>
            <h2 className={cx("userName")}>{userData.userName}</h2>
            {isFollowed ? (
              <Button unFollow onClick={() => handleUnFollow(userData.id)}>
                UnFollow
              </Button>
            ) : (
              <Button primary onClick={() => handleFollow(userData.id)}>
                Theo dõi
              </Button>
            )}
          </div>
          <ul className={cx("info")}>
            <li>
              <strong>{userData.bookNumberPost}</strong>
              <Button>Bài viết</Button>
            </li>
            <li>
              <strong>{userData.followerAccounts}</strong>
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
              <strong>{userData.followingAccounts}</strong>
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
          <ProfileMenu
            dataLove={favoriteBooks}
            dataPost={myPosts}
            unPost={unPosts}
          />
        </ul>
      </div>
    </div>
  );
}

export default UserInfo;
