import classNames from "classnames/bind";
import {
  faSpinner,
  faXmarkCircle,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./SearchItem.module.scss";

const cx = classNames.bind(style);
function SearchItem() {
  return (
    <div className={cx("search")}>
      <input placeholder="Tìm thể loại..."></input>
      <span className={cx("loadIcon")}>
        <FontAwesomeIcon icon={faSpinner} />
      </span>
      <span className={cx("clearIcon")}>
        <FontAwesomeIcon icon={faXmarkCircle} />
      </span>
      <span className={cx("line")}></span>
      <span className={cx("searchIcon")}>
        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
      </span>
    </div>
  );
}

export default SearchItem;
