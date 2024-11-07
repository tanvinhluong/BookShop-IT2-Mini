package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.request.CreateProductRequest;
import com.bookshop.ecommerce.request.CreateSupplierRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ISupplierService {

    public Supplier createSupplier(CreateSupplierRequest req);
    public List<Supplier> getAllSuppliers();
}
