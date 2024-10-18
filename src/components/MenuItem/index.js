import classNames from "classnames/bind";
import style from "./MenuItem.module.scss"
import { Link } from "react-router-dom";

const cx = classNames.bind(style)
function MenuItem({to, leftIcon, nameItem, sidebarItem, onClick, active, suggestItem, notLink}) {
    let Com = Link;
    if(notLink){
        Com = "li"
    }
    const props = {
        onClick,
    }
    const Classes = cx("wrapper", {
        sidebarItem, active, suggestItem
    })
    if(to){
        props.to = to;
    }
    
    return <Com className = {Classes} {...props}>
        <span className = {cx("icon")}>{leftIcon}</span>
        <p className = {cx("name")}>{nameItem}</p>
    </Com>;
}

export default MenuItem;