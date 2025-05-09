package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.ProductDetail;
import com.bookshop.ecommerce.request.CreateProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IProductService {

    public Product createProduct(CreateProductRequest req);

    public String deleteProduct(Integer productId) throws ProductException;

    Product updateProduct(CreateProductRequest createProductRequest, Integer productId) throws ProductException;

    public Product findProductById(Integer id) throws ProductException;

    public List<Product> findProductByCategory(Integer categoryId);

    public List<Product> searchProduct(String query);

    Page<Product> getAllProducts(Integer pageNumber, Integer pageSize);
}
