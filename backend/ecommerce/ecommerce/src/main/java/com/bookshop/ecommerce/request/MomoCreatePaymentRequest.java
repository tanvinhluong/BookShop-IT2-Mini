package com.bookshop.ecommerce.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MomoCreatePaymentRequest {
    private String partnerCode;
    private String orderId;
    private String orderInfo;
    private String redirectUrl;
    private String ipnUrl;
    private String amount;
    private String lang;
    private String requestId;
    private String extraData;
    private String signature;
    private String requestType;
}
