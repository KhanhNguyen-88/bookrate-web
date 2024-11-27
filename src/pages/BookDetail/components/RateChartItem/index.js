import classNames from "classnames/bind";
import style from "./RateChartItem.module.scss";

const cx = classNames.bind(style);
function RateChartItem({stars, ratings, percent}) {
  return (
    <div className={cx("wrapper")}>
      <div className = {cx("title")}>
        <strong>{stars} stars</strong>
      </div>
      <div className = {cx("main")}>
        <div className = {cx("mainWrapper")}>
          <div style={{width: `${percent}%`}}></div>
        </div>
      </div>
      <div className = {cx("number")}>{ratings} ({percent}%)</div>
    </div>
  );
}

export default RateChartItem;
