package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.CartItemException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.Cart;
import com.bookshop.ecommerce.model.CartItem;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.ProductDetail;

public interface ICartItemService {
    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Integer userId,Integer id,CartItem cartItem)
            throws CartItemException, UserException;
    public void deleteCartItem(Integer cartItemId);

    public CartItem isCartItemExists(Cart cart, ProductDetail productDetail, Integer userId);

    public void removeCartItem(Integer userId, Integer cartItemId) throws CartItemException, UserException;
    public CartItem findCartItemById(Integer cartItemId) throws CartItemException;
}
