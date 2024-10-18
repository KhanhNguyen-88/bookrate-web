import style from "./GenresItem.module.scss";
import classNames from "classnames/bind";
import Button from "../../../../components/Button";
const cx = classNames.bind(style);
function GenresItem({ genresItem }) {
  return (
    <li className={cx("wrapper")}>
      <Button to={genresItem.path} btnGenres leftIcon={genresItem.icon}>
        {genresItem.name}
      </Button>
    </li>
  );
}

export default GenresItem;
