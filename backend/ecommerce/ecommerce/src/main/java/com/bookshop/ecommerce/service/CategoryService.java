package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.Category;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.repository.CategoryRepository;
import com.bookshop.ecommerce.request.CreateCategoryRequest;
import com.bookshop.ecommerce.request.CreateSupplierRequest;
import com.bookshop.ecommerce.service.impl.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    private CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository=categoryRepository;
    }


    @Override
    public Category createCategory(CreateCategoryRequest req) {
        Category category = new Category();
        category.setName(req.getCategoryName());
        category.setDescription(req.getCategoryDescription());
        category.setImageUrl(req.getImgUrl());

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> findAllCategory(){
        List<Category> categoryList = categoryRepository.findAll();

        return categoryList;
    }
}
