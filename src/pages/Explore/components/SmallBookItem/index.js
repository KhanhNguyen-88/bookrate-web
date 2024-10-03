import ShowStars from "../../../../components/ShowStars";
import classNames from "classnames/bind";
import style from "./SmallBookItem.module.scss";
const cx = classNames.bind(style);
function SmallBookItem({ smallBook }) {
  return (
    <div className={cx("wrapper")}>
      <img src={smallBook.thumbnail} alt="thumbnail"></img>
      <div className = {cx("info")}>
        <h4>{smallBook.title}</h4>
        <p>{smallBook.author.name}</p>
        <ul className = {cx("rate")}>
          <li>
            <ShowStars points={smallBook.points} smallBook/>
          </li>
          <li className = {cx("points")}>
            <strong>{smallBook.points}</strong>
          </li>
          <li className = {cx("ratings")}>{smallBook.ratings} ratings</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default SmallBookItem;
