import classNames from "classnames/bind";
import style from "./Explore.module.scss";
import GenresBar from "./components/GenresBar";
import SmallBookItem from "./components/SmallBookItem";
import PaginatedItems from "./components/PaginatedItems";
import AuthorItem from "../../components/AuthorItem";
import UnderLine from "../../components/UnderLine";
import SearchItem from "../../components/SearchItem";
const BOOK_ITEMS = [
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1660145160i/61718053.jpg",
    title: "Happy Place",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
      name: "Emily Henry",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "Harriet and Wyn have been the perfect couple since they met in college—they go together like salt and pepper, honey and tea, lobster and rolls. Except, now—for reasons they’re still not discussing—they don’t.",
    points: "3.9",
    ratings: "1,053,411 ",
    reviews: "125,789",
    awards: ["Winner for Best Romance (2023)"],
    genres: ["Romance", "Fiction", "AudioBook"],
    format: "400 pages, Hardcover",
    published: "April 25, 2023 by Berkley",
    ISBN: "9780593441275 ",
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userComment: "Bad book!",
      commentPublished: "10d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692118145i/195820807.jpg",
    title: "Just for the Summer",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1651706989i/18446724._UX200_CR0,26,200,200_.jpg",
      name: "Abby Jimenez",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "Justin has a curse, and thanks to a Reddit thread, it's now all over the internet. Every woman he dates goes on to find their soul mate the second they break up. When a woman slides into his DMs with the same problem, they come up with a plan: They'll date each other and break up. Their curses will cancel each other’s out, and they’ll both go on to find the love of their lives. It’s a bonkers idea… and it just might work.",
    points: "4.40",
    ratings: "67,865",
    reviews: "463,982 ",
    awards: [],
    genres: ["Romance", "Fiction", "AudioBook"],
    format: "432 pages, Paperback",
    published: "First published April 2, 2024",
    ISBN: null,
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Hoang Tuan An",
      userComment: "Amazing book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664729357i/62848145.jpg",
    title: "The Housemaid's Secret",
    author: {
      avatar:
        "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1701487498i/7244758._UX200_CR0,4,200,200_.jpg",
      name: "Freida McFadden",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "As he continues showing me their incredible penthouse apartment, I have a terrible feeling about the woman behind closed doors. But I can't risk losing this job – not if I want to keep my darkest secret safe . . .",
    points: "4.6",
    ratings: "799,971",
    reviews: "55,172",
    awards: ["Winner for Best Mystery & Thriller (2023)"],
    genres: ["Romance", "Fiction", "AudioBook"],
    format: "318 pages, Kindle Edition",
    published: "February 20, 2023 by Bookouture",
    ISBN: "9781837901319",
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userComment: "Good book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
  {
    thumbnail:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1394264018i/21094869.jpg",
    title: "The Lovely Bones",
    author: {
      avatar: "",
      name: "BookRags",
      totalBooks: 17,
      followers: 10,
    },
    intro:
      "The 'The Lovely Bones' lesson plan contains a variety of teaching materials that cater to all learning styles. Inside you'll find 30 Daily Lessons, 20 Fun Activities, 180 Multiple Choice Questions, 60 Short Essay Questions, 20 Essay Questions, Quizzes/Homework Assignments, Tests, and more.",
    points: "3.0",
    ratings: "3",
    reviews: "0",
    awards: [""],
    genres: ["Education"],
    format: "347 pages, Kindle Edition",
    published: "January 11, 2012",
    ISBN: "",
    language: "English",
    interactiveInfo: {
      totalComment: 100,
      totalShare: 10,
    },
    firstComment: {
      userAvatar:
        "https://p16-sign-sg.tiktokcdn.com/aweme/720x720/tos-alisg-avt-0068/dbb3d05918086047edfdc37e479fa70d.jpeg?lk3s=a5d48078&nonce=41884&refresh_token=803d2856c7f576c21b63ee113f2d4775&x-expires=1727607600&x-signature=Albw7wOX4LQFMvIPxv%2Fs9ncqYw8%3D&shp=a5d48078&shcp=81f88b70",
      userName: "Nguyen Van Khanh",
      userComment: "Good book!",
      commentPublished: "2d",
      totalLikes: 2,
    },
    cost: "$11.1",
  },
];
const AUTHOR_ITEMS = [
  {
    avatar:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/nophoto/user/u_700x933.png",
    name: "BookRags",
    totalBooks: 17,
    followers: 10,
  },
  {
    avatar:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1651706989i/18446724._UX200_CR0,26,200,200_.jpg",
    name: "Abby Jimenez",
    totalBooks: 17,
    followers: 10,
  },
  {
    avatar:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1573928938i/13905555._UX200_CR0,1,200,200_.jpg",
    name: "Emily Henry",
    totalBooks: 17,
    followers: 10,
  },
  {
    avatar:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1701487498i/7244758._UX200_CR0,4,200,200_.jpg",
    name: "Freida McFadden",
    totalBooks: 17,
    followers: 10,
  },
];
const cx = classNames.bind(style);
function Explore() {
  const renderAuthorItems = () => {
    return AUTHOR_ITEMS.map((item, index) => {
      return <AuthorItem authorInfo={item} key={index} />;
    });
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("menuGenres")}>
        <GenresBar />
      </div>
      <div className={cx("content")}>
        <div className={cx("containerSmallBook")}>
          <div className = {cx("header")}>
            <h3>Thể loại: Tất cả</h3>
            <UnderLine/>
          </div>
          <div className={cx("books")}>
            <PaginatedItems itemsPerPage={4} items={BOOK_ITEMS} />
          </div>
        </div>
        <div className={cx("containerAuthor")}>
          <h4>Tác giả nổi bật của thể loại</h4>
          <ul className={cx("authors")}>{renderAuthorItems()}</ul>
        </div>
      </div>
    </div>
  );
}

export default Explore;
