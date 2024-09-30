import AvatarWrapper from "../AvatarWrapper";
import classNames from "classnames/bind";
import style from "./UserItem.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(style)
function UserItem() {
    return <Link to={"/account"} className = {cx("wrapper")}>
        <AvatarWrapper><img src="https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70" alt="avatar"/></AvatarWrapper>
        <div>
            <h6>Nguyen Van Khanh</h6>
            <h6>find happy time!</h6>
        </div>
    </Link>;
}

export default UserItem;