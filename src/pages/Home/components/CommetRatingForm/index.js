import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { getToken } from "../../../../services/localStorageService";

const CommentRatingForm = ({ bookId }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [success, setSuccess] = useState(false); // Trạng thái thành công

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleSubmit = async (e) => {
    const token = getToken();
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!comment.trim() || rating === 0) {
      alert("Vui lòng nhập bình luận và đánh giá!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/book/comment-book",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment,
            rating: rating.toString(), // Chuyển thành chuỗi nếu API yêu cầu
            bookId: bookId.toString(), // Chuyển thành chuỗi nếu API yêu cầu
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Không thể gửi bình luận. Vui lòng thử lại!");
      }

      // Reset form sau khi gửi
      setComment("");
      setRating(0);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        maxWidth: "800px",
        margin: "15px",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Bình luận..."
        style={{
          flex: "8",
          padding: "10px",
          height: "40px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          resize: "none",
          overflow: "hidden"
        }}
      />

      <div
        style={{
          flex: "2",
          display: "flex",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            size="lg"
            onClick={() => handleStarClick(star)}
            style={{
              color: star <= rating ? "#fe2c55" : "#ccc",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={loading} // Vô hiệu hóa khi đang gửi
        style={{
          flex: "1",
          backgroundColor: "#fe2c55",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      > Gửi
      </button>
    </form>
  );
};

export default CommentRatingForm;
