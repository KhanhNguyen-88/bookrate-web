import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";

import style from './HeaderMenu.module.scss';

const cx = classNames.bind(style)
function HeaderMenu({title, onClick}) {
    return <div className = {cx("wrapper")}>
        <span onClick={onClick}><FontAwesomeIcon icon={faArrowLeft}/></span>
        <h4>{title}</h4>
    </div>;
}

export default HeaderMenu;