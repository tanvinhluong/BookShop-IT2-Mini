package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.exception.ReviewException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.Review;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.ReviewRequest;
import com.bookshop.ecommerce.service.impl.IReviewService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private IReviewService reviewService;
    @Autowired
    private IUserService userService;

    public ReviewController(IReviewService reviewService,IUserService userService) {
        this.reviewService=reviewService;
        this.userService=userService;
        // TODO Auto-generated constructor stub
    }
    @PostMapping("/create")
    public ResponseEntity<Review> createReviewHandler(@RequestBody ReviewRequest req,@RequestHeader("Authorization") String jwt) throws UserException, ReviewException {
        User user=userService.findUserProfileByJwt(jwt);

        Review review=reviewService.createReview(req, user);

        return new ResponseEntity<Review>(review,HttpStatus.ACCEPTED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Review>> getProductReviewsHandler(@PathVariable Integer productId){
        List<Review>reviews=reviewService.getAllReviewsByProductId(productId);
        return new ResponseEntity<List<Review>>(reviews,HttpStatus.OK);
    }


}


