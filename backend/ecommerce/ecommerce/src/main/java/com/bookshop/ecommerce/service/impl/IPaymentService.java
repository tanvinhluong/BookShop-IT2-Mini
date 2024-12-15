package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.model.PaymentInfo;
import com.bookshop.ecommerce.request.CODRequest;
import com.bookshop.ecommerce.response.PaymentMomoResponse;
import com.bookshop.ecommerce.response.PaymentVNPayResponse;
import org.springframework.stereotype.Service;

@Service
public interface IPaymentService {

    PaymentMomoResponse createMomoPayment(String amount, Integer userId);
    PaymentVNPayResponse createVNPayPayment(String amount, Integer userId);

    //COD payment
    PaymentInfo createCodPayment(CODRequest codPaymentDTO);

    PaymentInfo getPaymentByCode(String paymentCode);
    void updatePaymentStatus(String paymentCode, String status);
}
