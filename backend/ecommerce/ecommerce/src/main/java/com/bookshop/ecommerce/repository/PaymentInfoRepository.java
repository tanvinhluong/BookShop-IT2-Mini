package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Integer> {
    PaymentInfo findByPaymentCode(String paymentCode);
}
