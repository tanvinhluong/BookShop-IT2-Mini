package com.bookshop.ecommerce.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MomoCreatePaymentResponse {
    private String payUrl;
    private String deeplink;
    private String qrCodeUrl;
    private String orderId;
    private String requestId;
    private String errorCode;
    private String message;
}
