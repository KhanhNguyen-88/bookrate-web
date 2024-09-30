import classNames from "classnames/bind";
import style from "./AvatarWrapper.module.scss"

const cx = classNames.bind(style)
function AvatarWrapper({children}) {
    return <div className = {cx("wrapper")}>{children}</div>;
}

export default AvatarWrapper;