import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./Button.module.scss"

const cx = classNames.bind(style)
function Button({btnHeader, second,primary, children, onclick, to, href, leftIcon}) {
    let Com = "button"
    const Classes = cx("wrapper", {
        primary, second, btnHeader
    })
    const props ={
        onclick,
    }
    if(to){
        props.to = to;
        Com = Link;
    }else if(href){
        props.href = href;
        Com = "a";
    }
    return (
        <Com className = {Classes} {...props}>
            {leftIcon && <span className = {cx("leftIcon")}>{leftIcon}</span>}{children}
        </Com>
    );
}

export default Button;