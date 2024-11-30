package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.exception.ReviewException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.OrderItemRepository;
import com.bookshop.ecommerce.repository.ProductRepository;
import com.bookshop.ecommerce.repository.ReviewRepository;
import com.bookshop.ecommerce.request.ReviewRequest;
import com.bookshop.ecommerce.service.impl.IOrderService;
import com.bookshop.ecommerce.service.impl.IProductService;
import com.bookshop.ecommerce.service.impl.IOrderItemService;

import com.bookshop.ecommerce.service.impl.IReviewService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReviewService implements IReviewService {

    private ReviewRepository reviewRepository;
    private IProductService productService;
    private ProductRepository productRepository;
    private OrderItemRepository orderItemRepository;

    public ReviewService(ReviewRepository reviewRepository, IProductService productService, ProductRepository productRepository, OrderItemRepository orderItemRepository) {
        this.reviewRepository=reviewRepository;
        this.productService=productService;
        this.productRepository=productRepository;
        this.orderItemRepository=orderItemRepository;
    }

    @Override
    public Review createReview(ReviewRequest req,User user) throws ReviewException {
        if (req.getRating() < 1 || req.getRating() > 5) {
            throw new ReviewException("Điểm đánh giá phải nằm trong khoảng từ 1 đến 5");
        }

        switch (reviewConditions(req.getOrderItemId(), user.getId())) {
            case 1:
                throw new ReviewException("Không tìm thấy Order Item");
            case 2:
                throw new ReviewException("Đơn hàng này không thuộc người dùng hện tại");
            case 3:
                throw new ReviewException("Đơn hàng có trạng thái chưa hoàn tất");
            case 4:
                throw new ReviewException("Đã tồn tại bình luận của sản phẩm trong đơn hàng này");
            case 5:
                break;
            default:
                throw new ReviewException("Lỗi không xác định");
        }

        Optional<OrderItem> orderItem = orderItemRepository.findById(req.getOrderItemId());

        Product product = orderItem
                .map(OrderItem::getProductDetail)  // Lấy ProductDetail từ OrderItem
                .map(ProductDetail::getProduct)  // Lấy Product từ ProductDetail
                .orElseThrow(() -> new ReviewException("Không tìm thấy Product"));

        Review review=new Review();
        review.setProduct(product);
        review.setCreatedAt(new Date());
        review.setActive(true);
        review.setComment(req.getComment());
        review.setRating(req.getRating());
        review.setOrderItem(orderItem.get());


        return reviewRepository.save(review);
    }

    @Override
    public Review updateReview(Integer reviewId, ReviewRequest req, User user) throws ReviewException {
        Review review = findReviewById(reviewId);
        if(!Objects.equals(review.getUserEmail(), user.getEmail())) {
            throw new ReviewException("Bạn không có quyền sửa đánh giá này!");
        }

        if (req.getRating() < 1 || req.getRating() > 5) {
            throw new ReviewException("Điểm đánh giá phải nằm trong khoảng từ 1 đến 5");
        }

        review.setComment(req.getComment());
        review.setRating(req.getRating());
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Integer reviewId, User user) throws ReviewException {
        Review review = findReviewById(reviewId);

        if(!Objects.equals(review.getUserEmail(), user.getEmail())) {
            throw new ReviewException("Bạn không có quyền xóa đánh giá này!");
        }

        reviewRepository.delete(review);
    }



    @Override
    public Review findReviewById(Integer reviewId) throws ReviewException {
        Optional<Review> review=reviewRepository.findById(reviewId);

        if(review.isPresent()) {
            return review.get();
        }
        throw new ReviewException("order not exist with id "+reviewId);
    }

    @Override
    public List<Review> getAllReviewsByProductId(Integer productId) {
        List<Review> reviews = reviewRepository.getAllReviewsByProductId(productId);

        return reviews;
    }

    @Override
    public Integer reviewConditions(Integer orderItemId, Integer userId) {
        // 1. Lấy ra order từ orderItemId
        Optional<OrderItem> orderItem = orderItemRepository.findById(orderItemId);
        if (orderItem.isEmpty()) {
            return 1; // Nếu không tìm thấy OrderItem, trả về false
        }

        Order order = orderItem.get().getOrder(); // Lấy Order từ OrderItem

        // 2. Xác định xem order đó có chứa userId không
        if (!order.getUser().getId().equals(userId)) {
            return 2; // Nếu không phải là đơn hàng của user này, trả về false
        }

        // 3. Kiểm tra trạng thái đơn hàng đã giao hàng chưa (orderStatus == 2)
        if (order.getOrderStatus() != 2) {
            return 3; // Nếu trạng thái đơn hàng không phải "đã giao hàng", trả về false
        }

        // 4. Kiểm tra trong bảng Review xem đã có review cho OrderItem này chưa
        Optional<Review> existingReview = orderItemRepository.findByOrderItemId(orderItemId);
        if (existingReview.isPresent()) {
            return 4; // Nếu đã có review, trả về false
        }

        // Nếu tất cả các điều kiện đều đúng, trả về true
        return 5;
    }
}

