package com.bookshop.ecommerce.response;

import com.bookshop.ecommerce.model.PaymentInfo;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentMomoResponse {
    private PaymentInfo paymentInfo;
    private String paymentUrl;
}