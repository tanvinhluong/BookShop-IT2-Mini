package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.address WHERE u.email = :email")
    public User findByEmail(String email);
}
