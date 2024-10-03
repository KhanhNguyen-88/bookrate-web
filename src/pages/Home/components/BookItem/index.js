import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import AuthorItem from "../../../../components/AuthorItem";
import Button from "../../../../components/Button";
import ShowStars from "../../../../components/ShowStars";
import style from "./BookItem.module.scss";

const cx = classNames.bind(style);
function BookItem({ item }) {
  const renderBookGenres = () => {
    return item.genres.map((item, index) => {
      return (
        <Button key={index} to>
          {item}
        </Button>
      );
    });
  };

  return (
    <div className={cx("book")}>
      <div className={cx("thumbnail")}>
        <img src={item.thumbnail} alt="book-img" />
        <div className={cx("btnGroup")}>
          <div className={cx("wtRead")}>
            <Button second>Quan tâm</Button>
            <span></span>
            <Button second>
              <FontAwesomeIcon icon={faChevronDown} />
            </Button>
          </div>
          <Button second>{item.cost} Tìm mua</Button>
        </div>
      </div>
      <div className={cx("info")}>
        <h3 className={cx("title")}>{item.title}</h3>
        <div>
          <div className={cx("rate")}>
            <ShowStars points={item.points} />
            <div className={cx("points")}>{item.points}</div>
            <span className={cx("ratings")}>{item.ratings} ratings</span>
          </div>
        </div>
        <div className={cx("award")}>
          <span>Choice Award</span>
          <span className={cx("awardName")}>
            <Button to>{item.awards}</Button>
          </span>
        </div>
        <div className={cx("intro")}>
          <p>{item.intro}</p>
        </div>
        <div className={cx("genres")}>
          <p>Genres</p>
          {renderBookGenres(item)}
        </div>
        <div className={cx("editionInfo")}>
          <ul>
            <li>
              <p>Format</p>
              <p className={cx("detail")}>{item.format}</p>
            </li>
            <li>
              <p>Published</p>
              <p className={cx("detail")}>{item.published}</p>
            </li>
            <li>
              <p>ISBN</p>
              <p className={cx("detail")}>{item.ISBN}</p>
            </li>
            <li>
              <p>Language</p>
              <p className={cx("detail")}>{item.language}</p>
            </li>
          </ul>
        </div>
        <div className={cx("author")}>
          <p>About author</p>
          <AuthorItem authorInfo={item.author} />
        </div>
      </div>
    </div>
  );
}

export default BookItem;
