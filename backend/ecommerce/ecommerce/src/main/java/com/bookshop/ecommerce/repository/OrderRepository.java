package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
//
//    old version
//    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND (o.orderStatus = PLACED OR o.orderStatus = CONFIRMED OR o.orderStatus = SHIPPED OR o.orderStatus = DELIVERED)")
//
//    new version
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId")
    public List<Order> getUsersOrders(@Param("userId") Integer userId);

    @Query("SELECT o FROM Order o ORDER BY o.id DESC LIMIT 1")
    Optional<Order> findLatestOrder();

}
