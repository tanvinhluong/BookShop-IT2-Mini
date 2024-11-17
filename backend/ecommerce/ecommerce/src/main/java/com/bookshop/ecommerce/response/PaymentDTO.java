package com.bookshop.ecommerce.response;

import lombok.Data;

@Data
public class PaymentDTO {
    private String paymentName;
    private String paymentCode;
    private String paymentAmount;
    private String createdAt;
    private String method;
    private String status;
}
