package com.bookshop.ecommerce.model.newmodel;


import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JoinColumn(name = "ORDER_ITEM_ID")
    @JsonIgnore
    private OrderItem orderItem;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_DETAIL_ID")
    @JsonIgnore
    private ProductDetail productDetail;
}
