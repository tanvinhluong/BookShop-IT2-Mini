package com.bookshop.ecommerce.request;

import lombok.Data;

@Data
public class RatingRequest {
    private Integer productId;
    private double rating;
}
