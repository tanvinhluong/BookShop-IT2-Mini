package com.bookshop.ecommerce.service.impl;


import com.bookshop.ecommerce.exception.OrderException;
import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.model.Order;
import com.bookshop.ecommerce.model.User;
import java.util.Date;

import java.util.List;

public interface IOrderService {
    public Order createOrder(User user, Address shippingAddress);
    public Order createOrderPhase2(User user, Integer cartId, Integer addressId, List<String> promotionCode) throws OrderException;
    public Order findOrderById(Integer orderId) throws OrderException;
    public Order findLatestOrder() throws OrderException;
    public List<Order> usersOrderHistory(Integer userId);
    public Order placedOrder(Integer orderId) throws OrderException;
    public Order confirmedOrder(Integer orderId) throws OrderException;
    public Order ShippedOrder(Integer orderId) throws OrderException;
    public Order deliveringOrder(Integer orderId) throws OrderException;
    public Order cancelOrder(Integer orderId) throws OrderException;
    public List<Order> getAllOrders();
    public void deleteOrder(Integer orderId) throws OrderException;
    Order updateDeliveryDate(Integer orderId, Date deliveryDate) throws OrderException;
}
