package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.config.MomoConfig;
import com.bookshop.ecommerce.request.MomoCreatePaymentRequest;
import com.bookshop.ecommerce.response.MomoCreatePaymentResponse;
import com.bookshop.ecommerce.model.PaymentInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class MomoPaymentService {
    private final RestTemplate restTemplate;
    @Autowired
    private MomoConfig momoConfig;

    @Autowired
    public MomoPaymentService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Autowired
    private ObjectMapper objectMapper;

    public String createPaymentUrl(PaymentInfo payment) {
        try {
            String requestId = UUID.randomUUID().toString();
            String orderId = payment.getPaymentCode();
            String orderInfo = "Thanh toan don hang: " + orderId;
            String rawSignature = "accessKey=" + momoConfig.getAccessKey() +
                    "&amount=" + payment.getPaymentAmount() +
                    "&extraData=" +
                    "&ipnUrl=" + momoConfig.getNotifyUrl() +
                    "&orderId=" + orderId +
                    "&orderInfo=" + orderInfo +
                    "&partnerCode=" + momoConfig.getPartnerCode() +
                    "&redirectUrl=" + momoConfig.getReturnUrl() +
                    "&requestId=" + requestId +
                    "&requestType=captureWallet";

            String signature = new HmacUtils("HmacSHA256", momoConfig.getSecretKey())
                    .hmacHex(rawSignature);

            MomoCreatePaymentRequest requestBody = MomoCreatePaymentRequest.builder()
                    .partnerCode(momoConfig.getPartnerCode())
                    .orderId(orderId)
                    .orderInfo(orderInfo)
                    .redirectUrl(momoConfig.getReturnUrl())
                    .ipnUrl(momoConfig.getNotifyUrl())
                    .amount(payment.getPaymentAmount())
                    .lang("vi")
                    .requestId(requestId)
                    .extraData("")
                    .signature(signature)
                    .requestType("captureWallet")
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<MomoCreatePaymentRequest> request = new HttpEntity<>(requestBody, headers);

            MomoCreatePaymentResponse response = restTemplate.postForObject(
                    momoConfig.getEndpoint(),
                    request,
                    MomoCreatePaymentResponse.class
            );

            if (response != null && response.getPayUrl() != null) {
                return response.getPayUrl();
            }

            throw new RuntimeException("Failed to create MOMO payment URL");
        } catch (Exception e) {
            throw new RuntimeException("Error creating MOMO payment: " + e.getMessage());
        }
    }
}
