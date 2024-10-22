package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.Review;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.ProductRepository;
import com.bookshop.ecommerce.repository.ReviewRepository;
import com.bookshop.ecommerce.request.ReviewRequest;
import com.bookshop.ecommerce.service.impl.IProductService;
import com.bookshop.ecommerce.service.impl.IReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService implements IReviewService {

    private ReviewRepository reviewRepository;
    private IProductService productService;
    private ProductRepository productRepository;

    public ReviewService(ReviewRepository reviewRepository, IProductService productService, ProductRepository productRepository) {
        this.reviewRepository=reviewRepository;
        this.productService=productService;
        this.productRepository=productRepository;
    }

    @Override
    public Review createReview(ReviewRequest req,User user) throws ProductException {
        // TODO Auto-generated method stub
        Product product=productService.findProductById(req.getProductId());
        Review review=new Review();
        review.setProduct(product);


        productRepository.save(product);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReview(Integer productId) {
        // TODO Auto-generated method stub
        return null;
    }
}
