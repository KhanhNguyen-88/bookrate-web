import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "./component/UserInfo";
import style from "./User.module.scss";

const cx = classNames.bind(style);
function User({ token }) {
  const { userId } = useParams();
  const [data, setData] = useState([]);
  const [profileData, setProfileData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // const paramsBookId = {
    //   userId: userId,
    // };
    // const queryBookIdString = new URLSearchParams(paramsBookId).toString();
    // if (!userId) {
    //   fetch(`http://localhost:8081/api/user/detail-by-token`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/x-www-form-urlencoded",
    //       "Authorization": `Bearer ${token}`,
    //     },
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((result) => {
    //       setProfileData(result.result);
    //       console.log(token)
    //       console.log(result.result);
    //       navigate(`/user/${result.result.id}`)
    //     });
    // } else {
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
          setData(result.result);
          console.log(result.result);
        });
    // }
  }, [userId]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("userInfo")}>
        <UserInfo dataLove={{ data: data, pageCount: 2 }}/>
      </div>
      <div className={cx("moreInfo")}></div>
    </div>
  );
}

export default User;
