import AvatarWrapper from "../AvatarWrapper";
import classNames from "classnames/bind";
import style from "./AuthorItem.module.scss"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const cx = classNames.bind(style)
function AuthorItem({authorInfo}) {
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
    return <Link to={`/user/${authorInfo.userId}`} className = {cx("wrapper")}>
        <AvatarWrapper><img src={`http://103.216.116.98:9000/book-rating/${authorInfo.userImage}`} alt="author-avatar"/></AvatarWrapper>
        <div className = {cx("info")}>
            <h5 className = {cx("name")}>{authorInfo.userName}</h5>
            <ul>
                <li className = {cx("totalBook")}><p>{authorInfo.fullName}</p></li>
            </ul>
        </div>
    </Link>;
}

export default AuthorItem;