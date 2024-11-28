package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.config.JwtProvider;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.bookshop.ecommerce.request.ChangePasswordRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
        Optional<User> user = userRepo.findById(userid);
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

    @Override
    public User updateUserProfile(String jwt, User updatedUser) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User existingUser = userRepo.findByEmail(email);

        if (existingUser == null) {
            throw new UserException("User not found with email: " + email);
        }

        if (updatedUser.getFirstName() != null) {
            existingUser.setFirstName(updatedUser.getFirstName());
        }
        if (updatedUser.getLastName() != null) {
            existingUser.setLastName(updatedUser.getLastName());
        }
        if (updatedUser.getMobile() != null) {
            existingUser.setMobile(updatedUser.getMobile());
        }
        if (updatedUser.getDefault_address_id() != null) {
            existingUser.setDefault_address_id(updatedUser.getDefault_address_id());
        }

        if (updatedUser.getEmail() != null && !updatedUser.getEmail().equals(existingUser.getEmail())) {
            existingUser.setEmail(updatedUser.getEmail());
        }

        return userRepo.save(existingUser);
    }

    @Override
    public void changePassword(String jwt, ChangePasswordRequest changePasswordRequest) throws UserException {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepo.findByEmail(email);

        if (user == null) {
            throw new UserException("User not found with email: " + email);
        }


        if (!encoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new UserException("Old password is incorrect");
        }


        user.setPassword(encoder.encode(changePasswordRequest.getNewPassword()));
        userRepo.save(user);
    }
}
