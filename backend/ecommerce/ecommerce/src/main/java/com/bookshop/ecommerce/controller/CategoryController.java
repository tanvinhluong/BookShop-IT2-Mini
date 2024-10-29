package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.CategoryException;
import com.bookshop.ecommerce.model.Category;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.request.CreateCategoryRequest;
import com.bookshop.ecommerce.request.CreateSupplierRequest;
import com.bookshop.ecommerce.service.impl.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService=categoryService;
    }

    @PostMapping("/create")
    public ResponseEntity<Category> createCategoryHandler(@RequestBody CreateCategoryRequest req) {

        Category category = categoryService.createCategory(req);

        return new ResponseEntity<>(category, HttpStatus.ACCEPTED);

    }

    @GetMapping("/get")
    public ResponseEntity<List<Category>> findAllCategory() {
        List<Category> res = categoryService.findAllCategory();
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }
}
