package com.bookshop.ecommerce.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MomoPaymentRequest {
    private String amount;
    private Integer userId;
}
