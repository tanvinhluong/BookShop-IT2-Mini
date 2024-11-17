package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.PaymentInfo;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.PaymentInfoRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.response.PaymentMomoResponse;
import com.bookshop.ecommerce.response.PaymentVNPayResponse;
import com.bookshop.ecommerce.service.impl.IPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
public class PaymentService implements IPaymentService {

    @Autowired
    private PaymentInfoRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MomoPaymentService momoPaymentService;

    @Autowired
    private VNPayService vnPayService;

    private String generatePaymentCode() {
        return UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private String getCurrentDateTime() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return now.format(formatter);
    }

    @Override
    public PaymentMomoResponse createMomoPayment(String amount, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PaymentInfo payment = new PaymentInfo();
        payment.setPaymentName("MOMO");
        payment.setPaymentCode(generatePaymentCode());
        payment.setPaymentAmount(amount);
        payment.setCreatedAt(getCurrentDateTime());
        payment.setMethod("MOMO_WALLET");
        payment.setStatus("PENDING");
        payment.setUser(user);

        payment = paymentRepository.save(payment);

        String paymentUrl = momoPaymentService.createPaymentUrl(payment);

        return PaymentMomoResponse.builder()
                .paymentInfo(payment)
                .paymentUrl(paymentUrl)
                .build();
    }

    @Override
    public PaymentVNPayResponse createVNPayPayment(String amount, Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        PaymentInfo payment = new PaymentInfo();
        payment.setPaymentName("VNPAY");
        payment.setPaymentCode(generatePaymentCode());
        payment.setPaymentAmount(amount);
        payment.setCreatedAt(getCurrentDateTime());
        payment.setMethod("VNPAY_GATEWAY");
        payment.setStatus("PENDING");
        payment.setUser(user);


        payment = paymentRepository.save(payment);
        String ipAddress = "http://localhost:5454";
        String paymentUrl = vnPayService.createPaymentUrl(payment, ipAddress);

        return PaymentVNPayResponse.builder()
                .paymentInfo(payment)
                .paymentUrl(paymentUrl)
                .build();
    }

    @Override
    public PaymentInfo getPaymentByCode(String paymentCode) {
        return paymentRepository.findByPaymentCode(paymentCode);
    }

    @Override
    public void updatePaymentStatus(String paymentCode, String status) {
        PaymentInfo payment = paymentRepository.findByPaymentCode(paymentCode);
        if (payment != null) {
            payment.setStatus(status);
            paymentRepository.save(payment);
        }
    }
}
