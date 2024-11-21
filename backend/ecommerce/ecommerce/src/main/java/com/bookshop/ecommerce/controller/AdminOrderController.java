package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.OrderException;
import com.bookshop.ecommerce.model.Order;
import com.bookshop.ecommerce.response.ApiResponse;
import com.bookshop.ecommerce.service.impl.IOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import org.springframework.format.annotation.DateTimeFormat;


import java.util.List;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

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

    @PutMapping("/{orderId}/ship")
    public ResponseEntity<Order> shippedOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException{
        Order order=orderService.ShippedOrder(orderId);
        return new ResponseEntity<Order>(order,HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/deliver")
    public ResponseEntity<Order> deliveredOrderHandler(@PathVariable Integer orderId, @RequestHeader("Authorization") String jwt) throws OrderException{
        Order order=orderService.deliveredOrder(orderId);
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

}
