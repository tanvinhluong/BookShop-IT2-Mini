package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.config.VNPayConfig;
import com.bookshop.ecommerce.model.PaymentInfo;
import org.apache.commons.codec.digest.HmacUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Service
public class VNPayService {

    @Autowired
    private VNPayConfig vnPayConfig;

    public String createPaymentUrl(PaymentInfo payment, String ipAddress) {
        try {
            String vnpVersion = "2.1.0";
            String vnpCommand = "pay";
            String orderType = "other";
            String bankCode = "";
            String locale = "vn";

            // Convert amount to VNPay format (multiply by 100)
            long amount = Long.parseLong(payment.getPaymentAmount()) * 100;

            String vnpCreateDate = LocalDateTime.now().format(
                    DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

            String vnpTxnRef = payment.getPaymentCode();
            String vnpOrderInfo = "Thanh toan don hang:" + vnpTxnRef;

            StringBuilder urlBuilder = new StringBuilder();
            urlBuilder.append(vnPayConfig.getPaymentUrl())
                    .append("?vnp_Version=").append(vnpVersion)
                    .append("&vnp_Command=").append(vnpCommand)
                    .append("&vnp_TmnCode=").append(vnPayConfig.getTmnCode())
                    .append("&vnp_Amount=").append(amount)
                    .append("&vnp_CurrCode=VND")
                    .append("&vnp_BankCode=").append(bankCode)
                    .append("&vnp_TxnRef=").append(vnpTxnRef)
                    .append("&vnp_OrderInfo=").append(URLEncoder.encode(vnpOrderInfo, StandardCharsets.UTF_8))
                    .append("&vnp_OrderType=").append(orderType)
                    .append("&vnp_Locale=").append(locale)
                    .append("&vnp_ReturnUrl=").append(URLEncoder.encode(vnPayConfig.getReturnUrl(), StandardCharsets.UTF_8))
                    .append("&vnp_IpAddr=").append(ipAddress)
                    .append("&vnp_CreateDate=").append(vnpCreateDate);

            String queryUrl = urlBuilder.toString();
            String vnpSecureHash = calculateVNPaySecureHash(queryUrl);

            return queryUrl + "&vnp_SecureHash=" + vnpSecureHash;
        } catch (Exception e) {
            throw new RuntimeException("Error creating VNPay payment: " + e.getMessage());
        }
    }

    private String calculateVNPaySecureHash(String queryUrl) {
        String[] queryParams = queryUrl.substring(queryUrl.indexOf("?") + 1).split("&");
        Arrays.sort(queryParams);

        StringBuilder hashData = new StringBuilder();
        for (String param : queryParams) {
            if (param.startsWith("vnp_")) {
                hashData.append(param).append("&");
            }
        }

        if (hashData.length() > 0) {
            hashData.setLength(hashData.length() - 1); // Remove last &
        }

        return new HmacUtils("HmacSHA512", vnPayConfig.getHashSecret())
                .hmacHex(hashData.toString());
    }
}
