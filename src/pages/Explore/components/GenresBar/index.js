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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import GenresItem from "../GenresItem";
import classNames from "classnames/bind";
import style from "./GenresBar.module.scss";
import Button from "../../../../components/Button";

const GENRES_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faBook} />,
    name: "Tiểu thuyết",
    path: "/tieu-thuyet",
  },
  {
    icon: <FontAwesomeIcon icon={faRocket} />,
    name: "Khoa học & viễn tưởng",
    path: "/kh-vt",

  },
  {
    icon: <FontAwesomeIcon icon={faUserSecret} />,
    name: "Huyền Bí",
    path: "/huyen-bi",
  },
  {
    icon: <FontAwesomeIcon icon={faSeedling} />,
    name: "Phát triển bản thân",
    path: "/self-help",
  },
  {
    icon: <FontAwesomeIcon icon={faPen} />,
    name: "Tự truyện",
    path: "/tu-truyen",
  },
  {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    name: "Kinh doanh",
    path: "/kinh-doanh",
  },
  {
    icon: <FontAwesomeIcon icon={faChild} />,
    name: "Trẻ thơ",
    path: "/tre-tho",
  },
  {
    icon: <FontAwesomeIcon icon={faUtensils} />,
    name: "Nấu ăn",
    path: "/nau-an",
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
      <Button btnGenres><FontAwesomeIcon icon={faSearch}/></Button>
    </ul>
  );
}

export default GenresBar;
