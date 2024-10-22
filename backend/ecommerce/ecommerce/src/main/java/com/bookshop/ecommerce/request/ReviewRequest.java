package com.bookshop.ecommerce.request;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private Integer productId;
    private String review;
}
