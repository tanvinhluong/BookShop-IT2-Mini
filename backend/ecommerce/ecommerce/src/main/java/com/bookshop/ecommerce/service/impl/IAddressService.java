package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.CreateAddressRequest;
import io.swagger.models.auth.In;

import java.util.List;

public interface IAddressService {
    public List<Address> findAllAddress();
    Address createAddress(CreateAddressRequest address, User user);
    Address findLatestAddressByUserId(Integer userId);
}
