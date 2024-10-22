package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.OrderException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.model.Order;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.service.IOrderService;
import com.bookshop.ecommerce.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private IOrderService orderService;
    @Autowired
    private IUserService userService;

    public OrderController(IOrderService orderService,IUserService userService) {
        this.orderService=orderService;
        this.userService=userService;
    }

    @PostMapping("/")
    public ResponseEntity<Order> createOrderHandler(@RequestBody Address shippingAddress,
                                                    @RequestHeader("Authorization")String jwt) throws UserException{

        User user=userService.findUserProfileByJwt(jwt);
        Order order =orderService.createOrder(user, shippingAddress);
        System.out.println("order:"+order);
        return new ResponseEntity<Order>(order,HttpStatus.OK);

    }

    @GetMapping("/user")
    public ResponseEntity< List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorization")
                                                                 String jwt) throws OrderException, UserException{

        User user=userService.findUserProfileByJwt(jwt);
        List<Order> orders=orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity< Order> findOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization")
    String jwt) throws OrderException, UserException{

        User user=userService.findUserProfileByJwt(jwt);
        Order orders=orderService.findOrderById(orderId);
        return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
    }

}
