import classNames from "classnames/bind";
import style from "./ActionBarItem.module.scss";

const cx = classNames.bind(style)
function ActionBarItem({icon, data, image}) {
    return <li className = {cx("item")}>
        <span>{icon}</span>
        <p className = {cx("data")}>{data}</p>
    </li>;
}

export default ActionBarItem;