package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.Category;
import com.bookshop.ecommerce.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    private CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository=categoryRepository;
    }


    @Override
    public List<Category> findAllCategory(){
        List<Category> categoryList = categoryRepository.findAll();

        return categoryList;
    }
}
