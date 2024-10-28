package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.repository.CategoryRepository;
import com.bookshop.ecommerce.repository.ProductRepository;
import com.bookshop.ecommerce.repository.SupplierRepository;
import com.bookshop.ecommerce.request.CreateProductRequest;
import com.bookshop.ecommerce.request.CreateSupplierRequest;
import com.bookshop.ecommerce.service.impl.IProductService;
import com.bookshop.ecommerce.service.impl.ISupplierService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService implements ISupplierService {

    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Supplier createSupplier(CreateSupplierRequest req) {
        Supplier supplier = new Supplier();
        supplier.setName(req.getSupplierName());
        supplier.setDescription(req.getSupplierDescription());

        return supplierRepository.save(supplier);
    }

}
