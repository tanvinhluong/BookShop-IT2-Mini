package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.User;

import java.util.List;

public interface IUserService {
    public User findUserById(Integer userId) throws UserException;
    public User findUserProfileByJwt(String jwt) throws UserException;
    public List<User> getAllUser();
    User updateUserProfile(String jwt, User updatedUser) throws UserException;
}
