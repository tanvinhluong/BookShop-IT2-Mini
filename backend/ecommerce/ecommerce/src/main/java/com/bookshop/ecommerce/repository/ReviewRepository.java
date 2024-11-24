package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT r FROM Review r WHERE r.product.id=:productId")
    public List<Review> getAllReviewsByProductId(@Param("productId") Integer productId);
}
