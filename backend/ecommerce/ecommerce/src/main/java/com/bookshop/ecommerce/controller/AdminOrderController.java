package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.OrderException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.Order;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.repository.OrderRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.response.ApiResponse;
import com.bookshop.ecommerce.service.EmailService;
import com.bookshop.ecommerce.service.VerificationService;
import com.bookshop.ecommerce.service.impl.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;


import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private VerificationService verifyService;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private EmailService emailService;

    private final IOrderService orderService;

    public AdminOrderController(IOrderService orderService) {
        this.orderService = orderService;
    }


    @GetMapping("/")
    public ResponseEntity<List<Order>> getAllOrdersHandler(){
        List<Order> orders=orderService.getAllOrders();

        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/confirmed")
    public ResponseEntity<Order> ConfirmedOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException {
        Order order=orderService.confirmedOrder(orderId);
        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/approve")
    public ResponseEntity<Order> shippedOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException{
        Order order=orderService.ShippedOrder(orderId);
        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<Order> deliveredOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException{
        Order order=orderService.deliveringOrder(orderId);
        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> canceledOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException{
        Order order=orderService.cancelOrder(orderId);
        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{orderId}/delete")
    public ResponseEntity<ApiResponse> deleteOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException{
        orderService.deleteOrder(orderId);
        ApiResponse res=new ApiResponse("Order Deleted Successfully",true);
        System.out.println("delete method working....");
        return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderByIdHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException {
        Order order = orderService.findOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/{orderId}/update-delivery-date")
    public ResponseEntity<Order> updateDeliveryDateHandler(
            @PathVariable Integer orderId,
            @RequestParam("deliveryDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date deliveryDate,
            @RequestHeader("Authorization") String jwt) throws OrderException {
        Order updatedOrder = orderService.updateDeliveryDate(orderId, deliveryDate);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    @PostMapping("/request-order-confirmation")
    public ResponseEntity<String> requestOrderConfirmation(@RequestParam("orderId") Integer orderId) {
        try {
            // Log orderId để chắc chắn rằng nó được nhận đúng
            System.out.println("Received orderId: " + orderId);

            // Tìm đơn hàng theo orderId
            Order order = orderRepo.findById(orderId).orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

            // Log thông tin của order
            System.out.println("Found order: " + order);

            // Lấy user từ đơn hàng
            User user = order.getUser();
            if (user == null) {
                throw new RuntimeException("Không tìm thấy người dùng liên kết với đơn hàng");
            }

            // Lấy email của người dùng
            String email = user.getEmail();
            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Email của người dùng không tồn tại");
            }

            // Log email để kiểm tra
            System.out.println("User email: " + email);

            // Tạo token xác nhận
            String token = verifyService.createOrderConfirmationToken(user, order);

            // Gửi email xác nhận
            emailService.sendOrderConfirmationEmail(user, order, token);

            return new ResponseEntity<>("Email xác nhận đơn hàng đã được gửi cho " + email, HttpStatus.OK);
        } catch (RuntimeException e) {
            // Log lỗi chi tiết
            System.err.println("Error: " + e.getMessage());
            return new ResponseEntity<>("Có lỗi xảy ra: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            // Log các lỗi không mong đợi
            System.err.println("System error: " + e.getMessage());
            return new ResponseEntity<>("Lỗi hệ thống: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user-confirm-order")
    public ResponseEntity<String> confirmOrder(@RequestParam("token") String token) {
        System.out.println("Received token: " + token);
        String result = verifyService.validateOrderConfirmationToken(token);
        String template;
        HttpStatus status = HttpStatus.OK;

        switch (result) {
            case "valid":
                template = "verification/OrderSuccess";
                break;
            case "invalid":
                template = "verification/OrderInvalid";
                status = HttpStatus.BAD_REQUEST;
                break;
            default:
                template = "verification/Expire";
                status = HttpStatus.BAD_REQUEST;
                break;
        }

        String htmlContent;
        try {
            Resource resource = new ClassPathResource("templates/" + template + ".html");
            htmlContent = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_HTML)
                    .body("<h1>Internal Server Error</h1>");
        }

        return ResponseEntity.status(status)
                .contentType(MediaType.TEXT_HTML)
                .body(htmlContent);
    }

    @GetMapping("/user-cancel-order")
    public ResponseEntity<String> cancelOrder(@RequestParam("token") String token) {
        System.out.println("Received token for cancellation: " + token);

        // Xác thực token hủy đơn hàng
        String result = verifyService.validateOrderCancellationToken(token);

        String template;
        HttpStatus status = HttpStatus.OK;

        // Kiểm tra kết quả xác thực token
        switch (result) {
            case "valid":
                template = "verification/CancelSuccess"; // Giao diện thông báo hủy thành công
                break;
            case "invalid":
                template = "verification/CancelInvalid"; // Giao diện thông báo token không hợp lệ
                status = HttpStatus.BAD_REQUEST;
                break;
            default:
                template = "verification/CancelExpire"; // Giao diện thông báo token đã hết hạn
                status = HttpStatus.BAD_REQUEST;
                break;
        }

        // Trả về nội dung HTML từ tệp template
        String htmlContent;
        try {
            Resource resource = new ClassPathResource("templates/" + template + ".html");
            htmlContent = new String(FileCopyUtils.copyToByteArray(resource.getInputStream()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_HTML)
                    .body("<h1>Internal Server Error</h1>");
        }

        return ResponseEntity.status(status)
                .contentType(MediaType.TEXT_HTML)
                .body(htmlContent);
    }

}
