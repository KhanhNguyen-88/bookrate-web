import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../../../../components/Button";

import style from "./UserComment.module.scss";
import AvatarWrapper from "../../../../components/AvatarWrapper";
import ShowStars from "../../../../components/ShowStars";
import { useState, useEffect } from "react";

const cx = classNames.bind(style);
function UserComment({ userFirstComment }) {
  const [imagePre, setImagePre] = useState("");
  useEffect(() => {
    if (userFirstComment && userFirstComment.userImage) {
      fetch(
        `http://localhost:8081/api/file/preview/${userFirstComment.userImage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
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
  }, [userFirstComment]);
  const date = new Date(userFirstComment.createdAt); // hoặc một ngày cố định
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
  return (
    <div className={cx("wrapper")}>
      <AvatarWrapper>
        <img src={imagePre} alt="avatar"></img>
      </AvatarWrapper>
      <div className={cx("mainCom")}>
        <div className={cx("wrapperContentCom")}>
          <ShowStars points={userFirstComment.rating} smallBook />
          <div className={cx("contentCom")}>
            <h5>
              <p>{userFirstComment.userName}</p>
              <p>{formattedDate}</p>
            </h5>
            <p>{userFirstComment.comment}</p>
          </div>
        </div>
        <div className={cx("interact")}>
          <ul>
            <li>
              {/* <Button to>{userFirstComment.createdAt}</Button> */}
            </li>
            <li>
              <Button to>Like</Button>
            </li>
          </ul>
          {/* <strong>{userFirstComment.totalLikes} Likes</strong> */}
        </div>
      </div>
    </div>
  );
}

export default UserComment;
