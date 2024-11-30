import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import "./UserComment.css";
import { API_BASE_URL } from "../../../config/apiConfig";
import CommentBox from "./CommentBox";

const UserComment = ({
  email,
  currentEmail,
  reviewId,
  rating,
  content,
  productDetailName,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [visibleEditCmtBox, setVisibleEditCmtBox] = useState(false);

  const handleDelete = async () => {
    const jwt = localStorage.getItem("jwt"); // Token lấy từ localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/reviews/delete/${reviewId}`,
        config
      );
      alert("Xóa đánh giá thành công");
      window.location.reload();
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau.");
    }
  };

  const handleConfirmDelete = () => {
    setShowOverlay(false);
    handleDelete();
  };

  const handleEdit = () => {
    setVisibleEditCmtBox(true);
  };

  return (
    <div className="user-comment">
      {visibleEditCmtBox && (
        <CommentBox
          star={rating}
          cmt={content}
          submitType={"edit"}
          reviewId={reviewId}
        />
      )}
      <div className="user-comment__header">
        <div className="user-comment__avatar">
          <span>{email?.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="user-comment__email">{email}</p>
          <p>{"Phân loại mua: " + productDetailName}</p>

          <div className="user-comment__rating">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`user-comment__star ${
                  index < rating ? "user-comment__star--filled" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="user-comment__content">{content}</p>

      {/* Buttons Section */}
      {email === currentEmail && (
        <div className="user-comment__actions">
          <button
            className="user-comment__button user-comment__button--edit"
            onClick={handleEdit}
          >
            Sửa
          </button>
          <button
            className="user-comment__button user-comment__button--delete"
            onClick={() => setShowOverlay(true)}
          >
            Xóa
          </button>
        </div>
      )}

      {/* Confirmation Overlay */}
      {showOverlay && (
        <div className="user-comment__overlay">
          <div className="user-comment__overlay-content">
            <p>Bạn có chắc muốn xóa bình luận này?</p>
            <div className="user-comment__overlay-buttons">
              <button
                className="user-comment__overlay-button user-comment__overlay-button--confirm"
                onClick={handleConfirmDelete}
              >
                Xác nhận
              </button>
              <button
                className="user-comment__overlay-button user-comment__overlay-button--cancel"
                onClick={() => setShowOverlay(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserComment;
