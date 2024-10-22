package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.OrderItem;
import com.bookshop.ecommerce.repository.OrderItemRepository;
import com.bookshop.ecommerce.service.impl.IOrderItemService;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService implements IOrderItemService {

    private OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository=orderItemRepository;
    }
    @Override
    public OrderItem createOrderItem(OrderItem orderItem) {

        return orderItemRepository.save(orderItem);
    }
}
