package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.request.CreateAddressRequest;
import com.bookshop.ecommerce.service.impl.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    private IAddressService addressService;


    @GetMapping("/get")
    public ResponseEntity<List<Address>> findAllCategory() {
        List<Address> res = addressService.findAllAddress();
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/get/latest/{userId}")
    public ResponseEntity<Address> findLatestAddress(@PathVariable Integer userId) {
        Address res = addressService.findLatestAddressByUserId(userId);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @PostMapping("/create")
    public ResponseEntity<Address> createAddressHandler(@RequestBody CreateAddressRequest req) {

        Address address = addressService.createAddress(req);

        return new ResponseEntity<>(address, HttpStatus.ACCEPTED);

    }

}
