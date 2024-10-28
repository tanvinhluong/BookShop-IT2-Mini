package com.bookshop.ecommerce.request;

import com.bookshop.ecommerce.model.Supplier;
import lombok.Data;

import java.util.Date;

@Data
public class CreateProductRequest {

    private String productName;
    private Date createdAt;
    private Integer supplierId;
    private String productDescription;
    private String imageUrl;
    private Double price;
    private Boolean isActive;
    private Double numRate;

}
