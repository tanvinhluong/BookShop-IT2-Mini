package com.bookshop.ecommerce.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "vnpay")
@Data
public class VNPayConfig {
    private String paymentUrl;
    private String tmnCode;
    private String hashSecret;
    private String returnUrl;
    private String apiUrl;
}
