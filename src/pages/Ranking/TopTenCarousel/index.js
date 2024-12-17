import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./TopTenCarousel.module.scss"; // Your custom styling
import Book from "../Book";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const TopTenCarousel = ({ books }) => {
  const renderBooks = () => {
    return books.map((item, index) => {
      return (
          <Book book={item} key={index}></Book>
      );
    });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <button className={cx("prev")}>‹</button>,
    nextArrow: <button className={cx("next")}>›</button>,
  };
  return (
    <div className={styles.carouselContainer}>
      <h2>Top 10 Sách được yêu thích nhất</h2>
      <Slider {...settings}>
        {renderBooks()}
      </Slider>
    </div>
  );
};

export default TopTenCarousel;
