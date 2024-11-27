import AvatarWrapper from "../AvatarWrapper";
import classNames from "classnames/bind";
import style from "./UserItem.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(style)
function UserItem({userFollowing}) {
    return <Link to={"/user/1"} className = {cx("wrapper")}>
        <AvatarWrapper><img src={userFollowing.userImage} alt="avatar"/></AvatarWrapper>
        <div>
            <strong>{userFollowing.userName}</strong>
            <h6>{userFollowing.userFullName}</h6>
        </div>
    </Link>;
}

export default UserItem;