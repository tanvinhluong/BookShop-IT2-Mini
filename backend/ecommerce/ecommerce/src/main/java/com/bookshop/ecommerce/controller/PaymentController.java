package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.model.PaymentInfo;
import com.bookshop.ecommerce.request.MomoPaymentRequest;
import com.bookshop.ecommerce.request.VNPayRequest;
import com.bookshop.ecommerce.response.PaymentMomoResponse;
import com.bookshop.ecommerce.response.PaymentVNPayResponse;
import com.bookshop.ecommerce.service.impl.IPaymentService;
import com.bookshop.ecommerce.service.impl.IUserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private IPaymentService paymentService;

    @Autowired
    private IUserService userService;

    @PostMapping("/momo")
    public ResponseEntity<?> createMomoPayment(
            @RequestBody MomoPaymentRequest req) {
        try {
            PaymentMomoResponse payment = paymentService.createMomoPayment(req.getAmount(), req.getUserId());
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/vnpay")
    public ResponseEntity<?> createVNPayPayment(
            @RequestBody VNPayRequest req) {
        try {
            PaymentVNPayResponse payment = paymentService.createVNPayPayment(req.getAmount(), req.getUserId());
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{paymentCode}")
    public ResponseEntity<?> getPaymentStatus(@PathVariable String paymentCode) {
        try {
            PaymentInfo payment = paymentService.getPaymentByCode(paymentCode);
            if (payment != null) {
                return ResponseEntity.ok(payment);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{paymentCode}/status")
    public ResponseEntity<?> updatePaymentStatus(
            @PathVariable String paymentCode,
            @RequestParam String status) {
        try {
            paymentService.updatePaymentStatus(paymentCode, status);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/momo/notify")
    public ResponseEntity<?> momoNotify(@RequestBody Map<String, String> requestBody) {
        String orderId = requestBody.get("orderId");
        String requestId = requestBody.get("requestId");
        String errorCode = requestBody.get("errorCode");

        if ("0".equals(errorCode)) {
            // Payment successful
            paymentService.updatePaymentStatus(orderId, "SUCCESS");
            return ResponseEntity.ok().build();
        } else {
            // Payment failed
            paymentService.updatePaymentStatus(orderId, "FAILED");
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/vnpay/return")
    public ResponseEntity<?> vnpayReturn(
            @RequestParam Map<String, String> queryParams,
            HttpServletResponse response) throws IOException {
        String vnpResponseCode = queryParams.get("vnp_ResponseCode");
        String orderId = queryParams.get("vnp_TxnRef");

        if ("00".equals(vnpResponseCode)) {
            // Payment successful
            paymentService.updatePaymentStatus(orderId, "SUCCESS");
            response.sendRedirect("/payment-success"); // Frontend success page
        } else {
            // Payment failed
            paymentService.updatePaymentStatus(orderId, "FAILED");
            response.sendRedirect("/payment-failed"); // Frontend failure page
        }

        return ResponseEntity.ok().build();
    }
}
