package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CategoryDetailRepository extends JpaRepository<CategoryDetail, Integer> {
//    Category findByName(String topLevelCategory);
//
//
//    @Query("SELECT c FROM Category c WHERE c.name = :name AND c.parentCategory.name = :parentCategoryName")
//    Category findByNameAndParent(@Param("name") String name, @Param("parentCategoryName") String parentCategoryName);
//// SELECT c FROM Category WHERE c.id = :id
//// SELECT d FROM Category WHERE c.parentCategory = d.id
//
//    @Query("SELECT c, d FROM Category c LEFT JOIN Category d ON c.parentCategory.id = d.id WHERE c.id = :id")
//    Category findParentCategoryById(@Param("id") Long id);
}
