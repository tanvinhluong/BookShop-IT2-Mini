package com.bookshop.ecommerce.model;

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
@Table(name = "payment_info")
public class PaymentInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "CARD_HOLDER_NAME")
    private String cardholderName;

    @Column(name = "CREDIT_CARD_NUMBER")
    private String cardNumber;

    @Column(name = "EXPIRATION_DATE")
    private String expirationDate;

    @Column(name="CVV")
    private String cvv;

    @Column(name = "CARD_METHOD")
    private String method;

    @Column(name = "PAYMENT_STATUS")
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
