package com.bookshop.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payment_info")
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "paymentName")
    private String paymentName;

    @Column(name = "PAYMENT_CODE")
    private String paymentCode;

    @Column(name = "PAYMENTPHONE")
    private String paymentPhone;

    @Column(name = "CREATED_AT")
    private String createdAt;

    @Column(name = "PAYMENTAMOUNT")
    private String paymentAmount;

    @Column(name = "CARD_METHOD")
    private String method;

    @Column(name = "PAYMENT_STATUS")
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "paymentInfo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Order> orders;
}
