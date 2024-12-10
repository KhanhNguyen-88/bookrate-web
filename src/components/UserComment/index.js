import React from 'react';
import styles from './UserComment.module.scss';

const UserComment = ({ commentData }) => {
  const { comment, userImage, userName, rating } = commentData;

  // Hàm tạo ngôi sao đánh giá
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? styles.filledStar : styles.emptyStar}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.commentContainer}>
      <img className={styles.userImage} src={userImage} alt={userName} />
      <div className={styles.commentDetails}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{userName}</span>
          <div className={styles.stars}>{renderStars(rating)}</div>
        </div>
        <p className={styles.commentText}>{comment}</p>
      </div>
    </div>
  );
};

export default UserComment;
