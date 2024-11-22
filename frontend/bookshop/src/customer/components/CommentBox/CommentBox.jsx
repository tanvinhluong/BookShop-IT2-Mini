import React, { useState } from "react";
import axios from "axios";
import "./CommentBox.css";
import { API_BASE_URL } from "../../../config/apiConfig";

const CommentBox = ({ itemId }) => {
  const [rating, setRating] = useState(0); // Đánh giá hiện tại
  const [hoverRating, setHoverRating] = useState(0); // Đánh giá khi hover
  const [comment, setComment] = useState(""); // Nội dung bình luận
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái gửi dữ liệu

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao");
      return;
    }

    const body = {
      comment: comment,
      rating: rating,
      orderItemId: itemId, // ID của order item được truyền từ cha
    };

    const jwt = localStorage.getItem("jwt"); // Token lấy từ localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    try {
      setIsSubmitting(true); // Đặt trạng thái gửi
      const response = await axios.post(
        `${API_BASE_URL}/api/reviews/create`,
        body,
        config
      );
      alert("Đánh giá của bạn đã được gửi!");
      console.log("API Response:", response.data);

      // Reset trạng thái sau khi gửi thành công
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false); // Hoàn thành gửi
    }
  };

  return (
    <div className="comment-box">
      <div className="comment-box__header">
        <strong className="comment-box__title">Đánh giá sản phẩm</strong>
        <div className="comment-box__stars">
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1;
            return (
              <span
                key={index}
                className={`comment-box__star ${
                  starIndex <= (hoverRating || rating)
                    ? "comment-box__star--filled"
                    : ""
                }`}
                onMouseEnter={() => setHoverRating(starIndex)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(starIndex)}
              >
                ★
              </span>
            );
          })}
        </div>
      </div>
      <div className="comment-box__body">
        <textarea
          className="comment-box__input"
          placeholder="Nhập bình luận của bạn..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button
          className="comment-box__button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi"}
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
