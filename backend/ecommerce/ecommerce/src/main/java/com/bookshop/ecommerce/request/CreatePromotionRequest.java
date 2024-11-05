package com.bookshop.ecommerce.request;

import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePromotionRequest {
    private String promotionName;
    private Integer promotionType;
    private Integer percentage;
    private Date startDate;
    private Date endDate;

    private Integer supplierId;
    private Integer productId;
    private Integer categoryId;
}
