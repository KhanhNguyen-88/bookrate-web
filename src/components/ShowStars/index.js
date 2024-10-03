import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import style from "./ShowStars.module.scss";

const cx = classNames.bind(style);
function ShowStars({ points, smallBook }) {
  const stars = Math.round(+points);
  const starsNumber = `h${stars}Stars`;
  const classesStar = cx("ratingIcon", starsNumber, {
    smallBook,
  });
  return (
    <div className={classesStar}>
      <span className={cx("star-1")}>
        <FontAwesomeIcon icon={faStar} />
      </span>
      <span className={cx("star-2")}>
        <FontAwesomeIcon icon={faStar} />
      </span>
      <span className={cx("star-3")}>
        <FontAwesomeIcon icon={faStar} />
      </span>
      <span className={cx("star-4")}>
        <FontAwesomeIcon icon={faStar} />
      </span>
      <span className={cx("star-5")}>
        <FontAwesomeIcon icon={faStar} />
      </span>
    </div>
  );
}

export default ShowStars;
