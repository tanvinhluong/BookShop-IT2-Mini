package com.bookshop.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Date createdAt;
    private Date deliveryDate;
    private Integer orderStatus;

    @ManyToOne
    @JoinColumn(name = "payment_id") // Liên kết với bảng PaymentDetail qua paymentId
    @JsonIgnore
    private PaymentInfo paymentInfo;

    private Double totalDiscountedPrice;
    private Double totalItem;
    private Double totalPrice;
    private Integer shippingAddressId;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<OrderItem> orderItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "USER_ID") // Liên kết với bảng User qua userId
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "PROMOTION_ID") // Liên kết với bảng Promotion qua promotionId
    @JsonIgnore
    private Promotion promotion;
}
