package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    @Query("SELECT p FROM Promotion p WHERE p.promotionCode LIKE CONCAT('%', :promotionCode, '%')")
    Promotion findByPromotionCode(@Param("promotionCode") String promotionCode);
}
