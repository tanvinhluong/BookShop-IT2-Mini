package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.ReviewException;
import com.bookshop.ecommerce.model.Review;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.ReviewRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IReviewService {
    public Review createReview(ReviewRequest reviewRequest, User user) throws ReviewException;
    public List<Review> getAllReviewsByProductId(Integer productId);
    public Integer reviewConditions(Integer orerItemId, Integer userId);
    public Review findReviewById(Integer reviewId) throws ReviewException;
    public Review updateReview(Integer reviewId, ReviewRequest req, User user) throws ReviewException;
    public void deleteReview(Integer reviewId, User user) throws ReviewException;
}
