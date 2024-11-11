package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.model.Supplier;
import com.bookshop.ecommerce.request.CreateSupplierRequest;
import com.bookshop.ecommerce.service.impl.ISupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/supplier")
public class SupplierController {
    @Autowired
    private ISupplierService supplierService;

    public SupplierController(ISupplierService supplierService){this.supplierService=supplierService;}
    @PostMapping("/create")
    public ResponseEntity<Supplier> createSupplierHandler(@RequestBody CreateSupplierRequest req) {

        Supplier createdSupplier = supplierService.createSupplier(req);

        return new ResponseEntity<>(createdSupplier, HttpStatus.ACCEPTED);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        return new ResponseEntity<>(suppliers, HttpStatus.ACCEPTED);
    }
}
