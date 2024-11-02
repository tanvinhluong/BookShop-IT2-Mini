package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.*;
import com.bookshop.ecommerce.service.impl.IProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductDetailService implements IProductDetailService {
    @Autowired
    private ProductDetailRepository productDetailRepository;

    public ProductDetailService(ProductDetailRepository productDetailRepository) {
        this.productDetailRepository = productDetailRepository;
    }

    @Override
    public ProductDetail findProductDetailByPrdId(Integer productId) throws ProductException {
        ProductDetail productDetail = productDetailRepository.findByProductId(productId);
        if(productDetail != null){
            return productDetail;
        }
        throw new ProductException("ProductDetail not found");
    }

}
