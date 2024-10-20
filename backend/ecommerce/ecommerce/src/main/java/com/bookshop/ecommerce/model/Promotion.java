package com.bookshop.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "promotion")
public class Promotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String promotionName;
    private Integer promotionType;
    private Integer percentage;
    private Date startDate;
    private Date endDate;

    // ORDERS
    @OneToMany(mappedBy = "promotion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID", insertable = false, updatable = false) // Tên cột khoá ngoại
    private Supplier supplier;

    // Liên kết với Product
    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID", insertable = false, updatable = false) // Tên cột khoá ngoại
    private Product product;

    // Liên kết với Category (Giả sử có model Category)
    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", insertable = false, updatable = false) // Tên cột khoá ngoại
    private Category category;
}
