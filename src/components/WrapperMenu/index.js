import classNames from "classnames/bind";
import style from "./WrapperMenu.module.scss"

const cx = classNames.bind(style)
function WrapperMenu({children}) {
    return <div className = {cx("wrapper")}>{children}</div>;
}

export default WrapperMenu;