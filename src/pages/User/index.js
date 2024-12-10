import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "./component/UserInfo";
import style from "./User.module.scss";

const cx = classNames.bind(style);
function User({ token }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("userInfo")}>
        <UserInfo/>
      </div>
      <div className={cx("moreInfo")}></div>
    </div>
  );
}

export default User;
