package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class HomeController {
    @GetMapping("/home")
    public ResponseEntity<ApiResponse> homeController(){

        ApiResponse res=new ApiResponse("Welcome To E-Commerce System", true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
