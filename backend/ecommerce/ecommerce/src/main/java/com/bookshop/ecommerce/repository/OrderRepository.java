package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
//
//    old version
//    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND (o.orderStatus = PLACED OR o.orderStatus = CONFIRMED OR o.orderStatus = SHIPPED OR o.orderStatus = DELIVERED)")
//
//    new version
//    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
//    public List<Order> getUsersOrders(@Param("userId") Integer userId);
}
