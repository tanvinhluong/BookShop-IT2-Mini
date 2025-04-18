package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.CreateAddressRequest;
import com.bookshop.ecommerce.service.impl.IAddressService;
import com.bookshop.ecommerce.service.impl.IUserService;
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

    @Autowired
    private IUserService userService;


    @GetMapping("/get")
    public ResponseEntity<List<Address>> findAllCategory() {
        List<Address> res = addressService.findAllAddress();
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @GetMapping("/get/latest")
    public ResponseEntity<Address> findLatestAddress(@RequestHeader("Authorization")
                                                         String jwt) throws UserException {
        User user = userService.findUserProfileByJwt(jwt);
        Address res = addressService.findLatestAddressByUserId(user.getId());
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @PostMapping("/create")
    public ResponseEntity<Address> createAddressHandler(@RequestBody CreateAddressRequest req, @RequestHeader("Authorization")
    String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);

        Address address = addressService.createAddress(req, user);

        return new ResponseEntity<>(address, HttpStatus.ACCEPTED);

    }

}
