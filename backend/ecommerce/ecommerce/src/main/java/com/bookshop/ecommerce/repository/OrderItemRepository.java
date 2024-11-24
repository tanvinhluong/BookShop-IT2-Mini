package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.OrderItem;
import com.bookshop.ecommerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query("SELECT r FROM Review r WHERE r.orderItem.id = :orderItemId")
    Optional<Review> findByOrderItemId(@Param("orderItemId") Integer orderItemId);
}
