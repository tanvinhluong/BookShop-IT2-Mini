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
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "PRODUCT_NAME", length = 200)
    private String productName;

    @Column(name = "CREATED_AT")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;


    @Column(name = "PRODUCT_DESCRIPTION", length = 2000)
    private String productDescription;

    @Column(name = "IMAGE_URL", length = 2000)
    private String productImageUrl;

    private Double price;

    private Boolean active;

    @Column(name = "NUM_RATINGS")
    private Double numRatings;


    // category
    @OneToMany(mappedBy = "product")
    private List<CategoryDetail> categoryDetails;

    // product detail
    @OneToMany(mappedBy = "product")
    private List<ProductDetail> productDetails;

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID")  // Foreign key to Supplier
    private Supplier supplier;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Promotion> promotions;

}
