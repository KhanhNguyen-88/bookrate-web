import classNames from "classnames/bind";
import style from "./RateChartItem.module.scss";

const cx = classNames.bind(style);

function RateChartItem({ stars, ratings, percent }) {
  const formattedPercent = parseFloat(percent).toFixed(2); // Giới hạn 2 chữ số thập phân

  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <strong>{stars} stars</strong>
      </div>
      <div className={cx("main")}>
        <div className={cx("mainWrapper")}>
          <div style={{ width: `${percent}%` }}></div>
        </div>
      </div>
      <div className={cx("number")}>
        {ratings} ({formattedPercent}%)
      </div>
    </div>
  );
}

export default RateChartItem;
