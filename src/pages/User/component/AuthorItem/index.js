import AvatarWrapper from "../../../../components/AvatarWrapper";
import classNames from "classnames/bind";
import style from "./AuthorItem.module.scss";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button";
import { getToken } from "../../../../services/localStorageService";
import { useState, useEffect } from "react";

const cx = classNames.bind(style);
function AuthorItem({ authorInfo}) {
  const [isFollow, setIsFollow] = useState(authorInfo.followBack);
  useEffect(() => {
    setIsFollow(authorInfo.followBack);
  }, [authorInfo.followBack]);
  const token = getToken(); 
  const handleFollow = (id) => {
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

      setIsFollow(true)
  };
  const handleUnFollow = (id) => {
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

      setIsFollow(false)
  };
  return (
    <div className={cx("mainWrapper")}>
      <Link to={`/user/${authorInfo.userId}`} className={cx("wrapper")}>
        {/* <AvatarWrapper> */}
        <img src={authorInfo.userImage} alt="author-avatar" />
        {/* </AvatarWrapper> */}
        <div className={cx("info")}>
          <h4 className={cx("name")}>{authorInfo.userName}</h4>
          {/* <ul>
                    <li className = {cx("totalBook")}><p>{authorInfo.totalBooks} Books</p></li>
                    {authorInfo.followers ? (<li className = {cx("followers")}><p>{authorInfo.followers} Followers</p></li>):<li/>}
                </ul> */}
        </div>
      </Link>
      {!isFollow ? (
        <Button primary onClick={() => handleFollow(authorInfo.userId)}>
          Follow lại
        </Button>
      ) : (
        <Button unFollow onClick={() => handleUnFollow(authorInfo.userId)}>
          Bỏ Follow
        </Button>
      )}
    </div>
  );
}

export default AuthorItem;
