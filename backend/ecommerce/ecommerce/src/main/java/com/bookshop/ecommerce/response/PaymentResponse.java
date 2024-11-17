package com.bookshop.ecommerce.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {
    private String paymentCode;
    private String paymentUrl;
    private String status;
    private String message;
}