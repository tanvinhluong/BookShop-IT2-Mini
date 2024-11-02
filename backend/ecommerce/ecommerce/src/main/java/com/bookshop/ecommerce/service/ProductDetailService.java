package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.*;
import com.bookshop.ecommerce.request.CreateProductRequest;
import com.bookshop.ecommerce.service.impl.IProductDetailService;
import com.bookshop.ecommerce.service.impl.IProductService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductDetailService implements IProductDetailService {
    @Autowired
    private ProductDetailRepository productDetailRepository;

    public ProductDetailService(ProductDetailRepository productDetailRepository) {
        this.productDetailRepository = productDetailRepository;
    }

    @Override
    public ProductDetail findProductDetailById(Integer id) throws ProductException {
        Optional<ProductDetail> productDetail = productDetailRepository.findById(id);
        if(productDetail.isPresent()){
            return productDetail.get();
        }
        throw new ProductException("ProductDetail not found");
    }

}
