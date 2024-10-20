package com.bookshop.ecommerce.model.newmodel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment_detail")
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "CARD_METHOD")
    private String method;
    @Column(name = "STATUS")
    private String status;
    // Payment Information
    @ManyToOne
    @JoinColumn(name = "PAYMENT_INFO_ID")
    private PaymentInfo paymentInfo;
    // Order Information
    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

}
