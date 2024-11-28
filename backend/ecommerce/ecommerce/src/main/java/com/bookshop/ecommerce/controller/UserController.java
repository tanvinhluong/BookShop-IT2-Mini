package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.bookshop.ecommerce.request.ChangePasswordRequest;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private IUserService userService;

    public UserController(IUserService userService) {
        this.userService=userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllusersHandler(){
        List<User> users= userService.getAllUser();

        return new ResponseEntity<>(users, HttpStatus.ACCEPTED);
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException{

        System.out.println("/api/users/profile");
        User user=userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<User>(user,HttpStatus.ACCEPTED);
    }

    @PutMapping("/edit")
    public ResponseEntity<User> editUserProfileHandler(
            @RequestHeader("Authorization") String jwt,
            @RequestBody User updatedUser) throws UserException {
        User user = userService.updateUserProfile(jwt, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePasswordHandler(
            @RequestHeader("Authorization") String jwt,
            @RequestBody ChangePasswordRequest changePasswordRequest) throws UserException {
        userService.changePassword(jwt, changePasswordRequest);
        return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
    }
}
