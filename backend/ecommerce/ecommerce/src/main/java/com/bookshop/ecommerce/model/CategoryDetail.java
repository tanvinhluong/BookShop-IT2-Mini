package com.bookshop.ecommerce.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category_detail")
public class CategoryDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // category_id is a foreign key
    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID")
    @JsonIgnore
    private Category category;
    // product_id is a foreign key
    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    @JsonIgnore
    private Product product;


}
