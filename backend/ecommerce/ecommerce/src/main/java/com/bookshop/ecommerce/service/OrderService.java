package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.OrderException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.*;
import com.bookshop.ecommerce.service.impl.ICartService;
import com.bookshop.ecommerce.service.impl.IOrderService;
import com.bookshop.ecommerce.user.domain.OrderStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {
    private final PromotionRepository promotionRepository;
    private OrderRepository orderRepository;
    private ICartService cartService;
    private AddressRepository addressRepository;
    private UserRepository userRepository;
    private OrderItemService orderItemService;
    private OrderItemRepository orderItemRepository;

    public OrderService(OrderRepository orderRepository, ICartService cartService,
                        AddressRepository addressRepository, UserRepository userRepository,
                        OrderItemService orderItemService, OrderItemRepository orderItemRepository, PromotionRepository promotionRepository) {
        this.orderRepository=orderRepository;
        this.cartService=cartService;
        this.addressRepository=addressRepository;
        this.userRepository=userRepository;
        this.orderItemService=orderItemService;
        this.orderItemRepository=orderItemRepository;
        this.promotionRepository = promotionRepository;
    }

    @Override
    public Order createOrder(User user, Address shippAddress) {

        shippAddress.setUser(user);
        Address address= addressRepository.save(shippAddress);
        user.getAddress().add(address);
        userRepository.save(user);

        Cart cart=cartService.findUserCart(user.getId());

        Order createdOrder=new Order();
        createdOrder.setUser(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setTotalItem((double) cart.getTotalItem());
        createdOrder.setTotalPrice(cart.getTotalPrice());
//        createdOrder.setTotalDiscountedPrice(cart);
        createdOrder.setOrderStatus(OrderStatus.PENDING.ordinal());
        createdOrder.setShippingAddressId(address.getId());
        createdOrder.setDeliveryDate(new Date());

        Order savedOrder=orderRepository.save(createdOrder);

        List<OrderItem> orderItems=new ArrayList<>();

        for(CartItem item: cart.getCartItems()) {
            OrderItem orderItem=new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setPrice(item.getPrice());
            orderItem.setProductDetail(item.getProductDetail());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());
            orderItem.setDiscountedPrice(0);
            OrderItem createdOrderItem = orderItemRepository.save(orderItem);

            orderItems.add(createdOrderItem);
        }


        for(OrderItem item: orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        return savedOrder;

    }

    @Override
    public Order createOrderPhase2(User user, Integer cartId, Integer addressId, List<String> promotionCodes) {

        Cart cart=cartService.findUserCart(user.getId());
        Promotion promotion = promotionRepository.findByPromotionCode(String.valueOf(promotionCodes));
        double totalDiscount =0;
        if (promotion != null){
                totalDiscount += calculateDiscount(cart.getTotalPrice(), promotion);
        } else {
            totalDiscount = 0;
        }

        Order createdOrder=new Order();
        createdOrder.setUser(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setTotalItem((double) cart.getTotalItem());
        createdOrder.setTotalPrice(cart.getTotalPrice());
        createdOrder.setTotalDiscountedPrice(totalDiscount);
        createdOrder.setOrderStatus(OrderStatus.PENDING.ordinal());
        createdOrder.setShippingAddressId(addressId);
        createdOrder.setDeliveryDate(new Date());
        createdOrder.setPromotion(promotion);


        Order savedOrder=orderRepository.save(createdOrder);

        List<OrderItem> orderItems=new ArrayList<>();

        for(CartItem item: cart.getCartItems()) {
            OrderItem orderItem=new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setPrice(item.getPrice());
            orderItem.setProductDetail(item.getProductDetail());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getPrice());
            orderItem.setDiscountedPrice((int) totalDiscount);
            OrderItem createdOrderItem = orderItemRepository.save(orderItem);

            orderItems.add(createdOrderItem);
        }


        for(OrderItem item: orderItems) {
            item.setOrder(savedOrder);
            orderItemRepository.save(item);
        }

        savedOrder.setOrderItems(orderItems);
        return savedOrder;

    }

    private double calculateDiscount(double totalPrice, Promotion promotion) {
        return totalPrice * (promotion.getPercentage() / 100.0);
    }

    @Override
    public Order placedOrder(Integer orderId) throws OrderException {
        Order order=findOrderById(orderId);
//        order.setOrderStatus(OrderStatus.PLACED);
//        order.getPaymentDetails().setStatus(PaymentStatus.COMPLETED);
        return order;
    }

    @Override
    public Order confirmedOrder(Integer orderId) throws OrderException {
        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.CONFIRMED.ordinal());

        return orderRepository.save(order);
    }

    @Override
    public Order ShippedOrder(Integer orderId) throws OrderException {
        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.SHIPPED.ordinal());
        return orderRepository.save(order);
    }


    @Override
    public Order deliveringOrder(Integer orderId) throws OrderException {
        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.DELIVERED.ordinal());
        return orderRepository.save(order);
    }


    @Override
    public Order cancelOrder(Integer orderId) throws OrderException {
        Order order=findOrderById(orderId);
        order.setOrderStatus(OrderStatus.CANCELLED.ordinal());
        return orderRepository.save(order);
    }

    @Override
    public Order findOrderById(Integer orderId) throws OrderException {
        Optional<Order> opt=orderRepository.findById(orderId);

        if(opt.isPresent()) {
            return opt.get();
        }
        throw new OrderException("order not exist with id "+orderId);
    }

    @Override
    public Order findLatestOrder() throws OrderException {
        Optional<Order> opt = orderRepository.findLatestOrder();

        if (opt.isPresent()) {
            return opt.get();
        }
        throw new OrderException("Không tồn tại đơn hàng nào.");
    }


    @Override
    public List<Order> usersOrderHistory(Integer userId) {
        List<Order> orders=orderRepository.getUsersOrders(userId);
        return orders;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public void deleteOrder(Integer orderId) throws OrderException {
        Order order =findOrderById(orderId);
        orderRepository.deleteById(orderId);

    }

    @Override
    public Order updateDeliveryDate(Integer orderId, Date deliveryDate) throws OrderException {
        Order order = findOrderById(orderId);

        if (order.getOrderStatus() == 5) {
            order.setOrderStatus(4);
        }

        order.setDeliveryDate(deliveryDate);
        return orderRepository.save(order);
    }

}
