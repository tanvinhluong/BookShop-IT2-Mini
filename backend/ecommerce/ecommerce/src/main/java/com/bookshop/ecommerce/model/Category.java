package com.bookshop.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "CATEGORY_NAME")
    private String name;
    @Column(name = "CATEGORY_DESCRIPTION")
    private String description;
    @Column(name = "IMG_URL")
    private String imageUrl;

    @OneToMany(mappedBy = "category")
    private List<CategoryDetail> categoryDetails;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Promotion> promotions;
}
