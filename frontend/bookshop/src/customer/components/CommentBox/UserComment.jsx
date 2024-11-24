import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "./UserComment.css";

const UserComment = ({ email, rating, content, productDetailName }) => {
  return (
    <div className="user-comment">
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
    </div>
  );
};

export default UserComment;
