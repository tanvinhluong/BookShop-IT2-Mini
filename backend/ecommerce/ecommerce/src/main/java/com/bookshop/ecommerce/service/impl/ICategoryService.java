package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.model.Category;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.request.CreateCategoryRequest;
import com.bookshop.ecommerce.request.CreateSupplierRequest;

import java.util.List;


public interface ICategoryService {

    public Category createCategory(CreateCategoryRequest req);

    public List<Category> findAllCategory();
}
