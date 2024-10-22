package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.config.JwtProvider;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    JwtProvider jwtProvider;


    @Override
    public User findUserById(Integer userid) throws UserException {
        Optional<User> user = userRepo.findById(Long.valueOf(userid));
        if(user.isPresent()){
            return user.get();
        }
        else{
            throw new UserException("User not found");
        }
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepo.findByEmail(email);
        if(user == null){
            throw new UserException("User not found with this email: "+email);
        }
        return user;
    }

    @Override
    public List<User> getAllUser(){

        return userRepo.findAll();
    }
}
