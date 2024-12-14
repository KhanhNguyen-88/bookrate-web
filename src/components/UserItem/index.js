import AvatarWrapper from "../AvatarWrapper";
import classNames from "classnames/bind";
import style from "./UserItem.module.scss"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const cx = classNames.bind(style)
function UserItem({userFollowing, userName, userImage}) {
    const [imagePre, setImagePre] = useState("");
    useEffect(() => {
        if (userName && userImage) {
          fetch(`http://localhost:8081/api/file/preview/${userImage}`, {
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
      }, [userImage]); 
    return <Link to={"/user/1"} className = {cx("wrapper")}>
        <AvatarWrapper><img src={imagePre} alt="avatar"/></AvatarWrapper>
        <div>
            <strong>{userName}</strong>
            {/* <h6>{userFollowing.userFullName}</h6> */}
        </div>
    </Link>;
}

export default UserItem;