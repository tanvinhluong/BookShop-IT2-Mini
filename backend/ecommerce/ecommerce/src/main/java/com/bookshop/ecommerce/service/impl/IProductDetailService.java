package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.ProductDetail;
import org.springframework.stereotype.Service;

@Service
public interface IProductDetailService {

    ProductDetail findProductDetailByPrdId(Integer productId) throws ProductException;

}
