package com.bookshop.ecommerce.model;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<CategoryDetail> categoryDetails;

    // product detail
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
//    @JsonManagedReference
    private List<ProductDetail> productDetails;

    @ManyToOne
    @JoinColumn(name = "SUPPLIER_ID")  // Foreign key to Supplier
    @JsonIgnore
    private Supplier supplier;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Promotion> promotions;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<Review> reviews;

}
