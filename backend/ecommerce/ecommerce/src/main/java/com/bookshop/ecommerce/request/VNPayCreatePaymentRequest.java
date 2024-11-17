package com.bookshop.ecommerce.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VNPayCreatePaymentRequest {
    private String vnpVersion;
    private String vnpCommand;
    private String vnpTmnCode;
    private String vnpAmount;
    private String vnpBankCode;
    private String vnpCreateDate;
    private String vnpCurrCode;
    private String vnpIpAddr;
    private String vnpLocale;
    private String vnpOrderInfo;
    private String vnpOrderType;
    private String vnpReturnUrl;
    private String vnpTxnRef;
    private String vnpSecureHash;
}
