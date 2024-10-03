import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faRocket,
  faUserSecret,
  faPen,
  faSeedling,
  faBriefcase,
  faChild,
  faBookOpen,
  faPencilAlt,
  faUtensils,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import GenresItem from "../GenresItem";
import classNames from "classnames/bind";
import style from "./GenresBar.module.scss";
import Button from "../../../../components/Button";

const GENRES_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faBook} />,
    name: "Tiểu thuyết",
  },
  {
    icon: <FontAwesomeIcon icon={faRocket} />,
    name: "Khoa học & viễn tưởng",
  },
  {
    icon: <FontAwesomeIcon icon={faUserSecret} />,
    name: "Huyền Bí",
  },
  {
    icon: <FontAwesomeIcon icon={faSeedling} />,
    name: "Phát triển bản thân",
  },
  {
    icon: <FontAwesomeIcon icon={faPen} />,
    name: "Tự truyện",
  },
  {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    name: "Kinh doanh",
  },
  {
    icon: <FontAwesomeIcon icon={faChild} />,
    name: "Trẻ thơ",
  },
  {
    icon: <FontAwesomeIcon icon={faUtensils} />,
    name: "Nấu ăn",
  },
  //   {
  //     icon: <FontAwesomeIcon icon={faPencilAlt} />,
  //     name: "Thơ",
  //   },
  //   {
  //     icon: <FontAwesomeIcon icon={faBookOpen} />,
  //     name: "Hư cấu",
  //   },
];
const cx = classNames.bind(style);
function GenresBar() {
  const renderGenresItems = () => {
    return GENRES_ITEMS.map((item, index) => {
      return <GenresItem key={index} genresItem={item} />;
    });
  };
  return (
    <ul className={cx("wrapper")}>
      <Button btnGenres>Tất cả</Button>
      {renderGenresItems()}
      <Button btnGenres>...</Button>
    </ul>
  );
}

export default GenresBar;
