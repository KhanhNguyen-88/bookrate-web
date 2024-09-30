import classNames from "classnames/bind";
import style from "./MenuItem.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(style)
function MenuItem({to, leftIcon, nameItem, sidebarItem, onClick}) {
    const props = {
        onClick,
    }
    const Classes = cx("wrapper", {
        sidebarItem
    })
    if(to){
        props.to = to;
    }
    return <Link className = {Classes} {...props}>
        <span className = {cx("icon")}>{leftIcon}</span>
        <p className = {cx("name")}>{nameItem}</p>
    </Link>;
}

export default MenuItem;