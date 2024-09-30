import AvatarWrapper from "../AvatarWrapper";
import classNames from "classnames/bind";
import style from "./UserItem.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(style)
function UserItem({userFollowing}) {
    return <Link to={"/account"} className = {cx("wrapper")}>
        <AvatarWrapper><img src={userFollowing.userAvatar} alt="avatar"/></AvatarWrapper>
        <div>
            <h6>{userFollowing.userName}</h6>
            <h6>{userFollowing.userSlogan}</h6>
        </div>
    </Link>;
}

export default UserItem;