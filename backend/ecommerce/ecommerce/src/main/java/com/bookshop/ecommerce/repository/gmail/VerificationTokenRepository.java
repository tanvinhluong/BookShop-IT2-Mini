package com.bookshop.ecommerce.repository.gmail;

import com.bookshop.ecommerce.model.Order;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Integer> {
    VerificationToken findByToken(String token);
    VerificationToken findByOrder(Order order);
    VerificationToken findByUserAndOrder(User user, Order order);
}
