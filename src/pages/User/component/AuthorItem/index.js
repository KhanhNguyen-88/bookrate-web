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
  const [imagePre, setImagePre] = useState();
  useEffect(() => {
    if (authorInfo && authorInfo.userImage) {
      fetch(`http://localhost:8081/api/file/preview/${authorInfo.userImage}`, {
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
  }, [authorInfo]);  

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
        <img src={`http://103.216.116.98:9000/book-rating/${authorInfo.userImage}`} alt="author-avatar" />
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
