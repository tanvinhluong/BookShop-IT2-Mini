package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.AddressRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.request.CreateAddressRequest;
import com.bookshop.ecommerce.service.impl.IAddressService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService implements IAddressService {

    private final UserRepository userRepository;
    private AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository, UserRepository userRepository) {
        this.addressRepository=addressRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<Address> findAllAddress() {
        return addressRepository.findAll();
    }

    @Override
    public Address createAddress(CreateAddressRequest req, User user) {
        Address address = new Address();
        address.setCity(req.getCity());
        address.setState(req.getState());
        address.setStreetAddress(req.getStreetAddress());
        address.setZipCode(req.getZipCode());
        address.setMobile(req.getMobile());
        address.setUser(user);

        return addressRepository.save(address);
    }

    @Override
    public Address findLatestAddressByUserId(Integer userId) {
        return addressRepository.findTopByUserIdOrderById(userId);
    }
}
