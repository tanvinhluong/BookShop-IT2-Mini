package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query("SELECT cd.product FROM CategoryDetail cd WHERE cd.category.id = :categoryId")
    List<Product> findProductsByCategoryId(@Param("categoryId") Integer categoryId);
//
//    @Query("SELECT p From Product p where LOWER(p.productName) Like %:query% OR LOWER(p.productDescription) Like %:query% OR LOWER(p.supplier) LIKE %:query% OR LOWER(p.categoryDetails) LIKE %:query%")
//    public List<Product> searchProduct(@Param("query")String query);
//
//     SELECT p From Product p Where LOWER(p.category.name)=:category
//     SELECT c From Product c Where p.parent_category_id = c.id WHERE c.category.name =:parentcategory
//    @Query("SELECT p FROM  " +
//            "JOIN .categoryDetails " +
//            "WHERE (category.name =  OR  = '')")
//    public List<Product> findByParentCategory(@Param("category") String category);
//
//
}
