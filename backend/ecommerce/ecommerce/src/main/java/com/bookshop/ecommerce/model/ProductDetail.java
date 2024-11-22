package com.bookshop.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_detail")
public class ProductDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name; // Loại size, màu, ... VD: ĐEN, SIZE M
    private Double price;
    private Integer inStock;
    private Integer soldQuantity;
    private String imageUrl;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "PRODUCT_ID") // Chỉ định khoá ngoại product_id
//    @JsonIgnore
    private Product product;



}
