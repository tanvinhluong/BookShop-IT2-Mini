package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    @Query("SELECT a FROM Address a WHERE a.user.id = :userId ORDER BY a.id DESC LIMIT 1")
    Address findTopByUserIdOrderById(Integer userId);
}
