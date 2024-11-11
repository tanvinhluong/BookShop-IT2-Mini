package com.bookshop.ecommerce.request;

import jakarta.persistence.ElementCollection;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePromotionRequest {
    private String promotionName;
    private Integer promotionType;
    private List<String> promotionCode;
    private Integer percentage;
    private Date startDate;
    private Date endDate;

    private Integer supplierId;
    private Integer productId;
    private Integer categoryId;
}
