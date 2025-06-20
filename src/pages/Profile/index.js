import { useEffect, useState } from "react";
import { getToken } from "../../services/localStorageService";
import classNames from "classnames/bind";
import ProfileMenu from "../User/component/ProfileMenu";
import style from "./Profile.module.scss";
import Button from "../../components/Button";
import Popup from "reactjs-popup";
import AuthorItem from "../User/component/AuthorItem";
import { Navigate } from "react-router-dom";

const cx = classNames.bind(style);

function Profile() {
  const [profileData, setProfileData] = useState({});
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupFollowing, setOpenPopupFollowing] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [unPosts, setUnPosts] = useState([]);
  const [imagePre, setImagePre] = useState(null);

  const token = getToken();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (!token) return;

        // Fetch profile data
        const userResponse = await fetch(
          "http://localhost:8081/api/user/detail-by-token",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error(
            `Failed to fetch user profile. Status: ${userResponse.status}`
          );
        }

        const userResult = await userResponse.json();
        const userData = userResult.result;
        setProfileData(userData);

        // Fetch user image preview
        if (userData?.userImage) {
          const imageResponse = await fetch(
            `http://localhost:8081/api/file/preview/${userData.userImage}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (imageResponse.ok) {
            const imageResult = await imageResponse.json();
            setImagePre(imageResult.result);
          } else {
            console.warn("Image not available on cloud.");
          }
        }

        // Fetch favorite books
        const bookResponse = await fetch(
          `http://localhost:8081/api/book/get-book-by-userId/${userData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (!bookResponse.ok) {
          throw new Error(
            `Failed to fetch books. Status: ${bookResponse.status}`
          );
        }

        const bookResult = await bookResponse.json();
        setFavoriteBooks(bookResult.result);

        //fetch my book
        const myBooksResponse = await fetch(
          `http://localhost:8081/api/book/get-posted-by-username/${userData.userName}`,
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

        //fetch my book
        const unBooksResponse = await fetch(
          `http://localhost:8081/api/book/get-book-unapprove/${userData.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!unBooksResponse.ok) {
          throw new Error(
            `Failed to fetch books. Status: ${unBooksResponse.status}`
          );
        }

        const unBookResult = await unBooksResponse.json();
        setUnPosts(unBookResult.result);
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [token]);

  const handleOpenFollower = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/user/follower-account-by-token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch followers. Status: ${response.status}`
        );
      }

      const result = await response.json();
      setFollower(result.result);
      setOpenPopup(true);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };

  const handleOpenFollowing = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/user/following-account-by-token",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch followings. Status: ${response.status}`
        );
      }

      const result = await response.json();
      setFollowing(result.result);
      setOpenPopupFollowing(true);
    } catch (error) {
      console.error("Error fetching followings:", error);
    }
  };

  const renderUserFollow = (follow) => {
    return follow.map((item, index) => (
      <AuthorItem authorInfo={item} key={index} />
    ));
  };

  return !token ? (
    <Navigate to="/login" />
  ) : (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperUserInfo")}>
        <img src={`http://localhost:9000/image-book-rate/${profileData.userImage}`} alt="avatar" />
        <div>
          <div className={cx("action")}>
            <h2 className={cx("userName")}>{profileData.userName}</h2>
          </div>
          <ul className={cx("info")}>
            <li>
              <strong>{profileData.bookNumberPost}</strong>
              <Button>Bài viết</Button>
            </li>
            <li>
              <strong>{profileData.followerAccounts}</strong>
              <Button to onClick={handleOpenFollower}>Follower</Button>
            </li>
            <Popup
              open={openPopup}
              onClose={() => setOpenPopup(false)}
              modal
              nested
            >
              {(close) => (
                <div className={cx("wrapperPopup")}>
                  <button className={cx("btnClose")} onClick={close}>
                    &times;
                  </button>
                  <h2>Follower</h2>
                  <div>
                    {follower.length > 0 ? (
                      renderUserFollow(follower)
                    ) : (
                      <p>Chưa được theo dõi bởi ai!</p>
                    )}
                  </div>
                </div>
              )}
            </Popup>
            <li>
              <Button to onClick={handleOpenFollowing}>Theo dõi</Button>
              <strong>{profileData.followingAccounts}</strong>
            </li>
            <Popup
              open={openPopupFollowing}
              onClose={() => setOpenPopupFollowing(false)}
              modal
              nested
            >
              {(close) => (
                <div className={cx("wrapperPopup")}>
                  <button className={cx("btnClose")} onClick={close}>
                    &times;
                  </button>
                  <h2>Đang Follow</h2>
                  <div>
                    {following.length > 0 ? (
                      renderUserFollow(following)
                    ) : (
                      <p>Không theo dõi ai!</p>
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
          <ProfileMenu dataLove={favoriteBooks} dataPost={myPosts} unPost={unPosts}/>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
