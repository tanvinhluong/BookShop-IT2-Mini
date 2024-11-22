package com.bookshop.ecommerce.request;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private String comment;
    private Integer rating;
    private Integer orderItemId;
}
