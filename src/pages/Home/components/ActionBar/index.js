import ActionBarItem from "../ActionBarItem";
import classNames from "classnames/bind";
import style from "./ActionBar.module.scss"

const cx = classNames.bind(style)
function ActionBar({items}) {
    const renderItems = ()=>{
        return items.map((item, index)=>{
            return <ActionBarItem key={index} icon={item.icon} data={item.data}/>
        })
    }
    return <ul className = {cx("wrapper")}>
        {renderItems()}
    </ul>;
}

export default ActionBar;