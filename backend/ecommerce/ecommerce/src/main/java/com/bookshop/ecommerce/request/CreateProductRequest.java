package com.bookshop.ecommerce.request;

import com.bookshop.ecommerce.model.Supplier;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class    CreateProductRequest {

    private String productName;
    private Date createdAt;
    private Integer supplierId;
    private String productDescription;
    private String imageUrl;
    private Double price;
    private Boolean isActive;
    private Double numRate;
    private Integer quantity;
    private List<Integer> categoryIds;
    private String productDetailName;
//    private List<Integer> productDetailIds;
//    private List<Integer> promotionIds;
}
