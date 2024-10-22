package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Integer> {
//
//
//    @Query("SELECT ci FROM CartItem ci WHERE ci.cart=:cart AND ci.productDetail=:product AND ci.productDetail=:userId")
//    CartItem isCartItemExists(@Param("cart") Cart cart, @Param("product") Product product, @Param("userId") Integer userId);
}
