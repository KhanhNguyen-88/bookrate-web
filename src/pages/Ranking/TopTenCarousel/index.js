import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./TopTenCarousel.module.scss";
import Book from "../Book";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TopTenCarousel = ({ books, title }) => {
  const renderBooks = () =>
    books.map((item, index) => (
      <div key={index} className={cx("carouselItem")}>
        <Book book={item} rank={index + 1} />
      </div>
    ));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    prevArrow: <button className={cx("arrow", "prev")}>‹</button>,
    nextArrow: <button className={cx("arrow", "next")}>›</button>,
  };

  return (
    <div className={cx("carouselContainer")}>
      <h2 className={cx("title")}>{title}</h2>
      <Slider {...settings}>{renderBooks()}</Slider>
    </div>
  );
};

export default TopTenCarousel;
