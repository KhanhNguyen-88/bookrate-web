import { faChevronDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import Button from "../../../../components/Button";
import style from "./BookItem.module.scss";

const cx = classNames.bind(style);
function BookItem({ item }) {
  const stars = Math.round(+item.points);
  const starsNumber = `h${stars}Stars`
  const classesStar = cx("ratingIcon", starsNumber)
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
            <Button second>Want to read</Button>
            <span></span>
            <Button second>
              <FontAwesomeIcon icon={faChevronDown} />
            </Button>
          </div>
          <Button second>{item.cost} Buy</Button>
        </div>
      </div>
      <div className={cx("info")}>
        <h3 className={cx("title")}>{item.title}</h3>
        <h6 className={cx("author")}>
          <Button to={"/author"}>{item.author}</Button>
        </h6>
        <div>
          <div className={cx("rate")}>
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
            <div className={cx("points")}>{item.points}</div>
            <div className={cx("rateInfo")}>
              <span className={cx("ratings")}>{item.ratings} ratings</span>
              <span className={cx("reviews")}>{item.reviews} reviews</span>
            </div>
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
      </div>
    </div>
  );
}

export default BookItem;
