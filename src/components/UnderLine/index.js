import style from './UnderLine.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(style)
function UnderLine() {
    return <li className = {cx("line")}></li>;
}

export default UnderLine;