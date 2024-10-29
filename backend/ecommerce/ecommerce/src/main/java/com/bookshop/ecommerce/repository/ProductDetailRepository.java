package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
//    @Query("SELECT pd FROM ProductDetail pd WHERE pd.category = :category AND pd.price BETWEEN :minPrice AND :maxPrice AND pd.discount >= :minDiscount ORDER BY pd.price")
//
}
