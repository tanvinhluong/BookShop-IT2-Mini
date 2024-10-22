package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.Cart;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.AddItemRequest;

public interface ICartService {
    public Cart createCart(User user);
    public String addToCartItem(Integer UserId, AddItemRequest addItemRequest) throws ProductException;
    public Cart findUserCart(Integer userId);
}
