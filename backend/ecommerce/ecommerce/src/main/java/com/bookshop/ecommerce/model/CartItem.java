package com.bookshop.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // cart_id is a foreign key
    @JsonIgnore
    @ManyToOne
    private Cart cart;

    // product_detailId is a foreign key
    @ManyToOne
    private ProductDetail productDetail;

    private int quantity;
    private Integer price;
}
