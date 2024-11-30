package com.bookshop.ecommerce.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "CREATED_AT")
    private Date createdAt;

    @Column(name = "COMMENT", length = 2000)
    private String comment;

    private Integer rating;

    private Boolean active;

    @OneToOne
    @JoinColumn(name = "ORDER_ITEM_ID")
    @JsonIgnore
    private OrderItem orderItem;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    @JsonIgnore
    private Product product;

    @JsonProperty("userEmail")
    public String getUserEmail() {
        return this.orderItem != null ? this.orderItem.getOrder().getUser().getEmail() : null;
    }

    @JsonProperty("orderDetailId")
    public Integer getOrderDetailId() {
        return this.orderItem != null ? this.orderItem.getId() : null;
    }

    @JsonProperty("productDetailName")
    public String getProductDetailName() {
        return this.orderItem != null ? this.orderItem.getProductDetail().getName() : null;
    }
}
