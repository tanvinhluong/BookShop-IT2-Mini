package com.bookshop.ecommerce.facade;

import com.bookshop.ecommerce.exception.CartItemException;
import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.Cart;
import com.bookshop.ecommerce.model.CartItem;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.AddItemRequest;
import com.bookshop.ecommerce.service.impl.ICartItemService;
import com.bookshop.ecommerce.service.impl.ICartService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.stereotype.Component;

@Component
public class ShoppingFacade {
    private IUserService userService;
    private ICartService cartService;
    private ICartItemService cartItemService;

    // FACADE PATTERN
    public ShoppingFacade(IUserService userService, ICartService cartService, ICartItemService cartItemService) {
        this.userService = userService;
        this.cartService = cartService;
        this.cartItemService = cartItemService;
    }

    public User getUserByJwt(String jwt) throws UserException {
        return userService.findUserProfileByJwt(jwt);
    }

    public Cart getUserCart(Integer userId) throws ProductException {
        return cartService.findUserCart(userId);
    }

    public void addItemToCart(Integer userId, AddItemRequest req) throws ProductException {
        cartService.addToCartItem(userId, req);
    }

    public void removeCartItem(Integer userId, Integer cartItemId) throws CartItemException, UserException {
        cartItemService.removeCartItem(userId, cartItemId);
    }
    public CartItem updateCartItem(Integer userId, Integer cartItemId, Integer quantity, CartItem cartItem) throws CartItemException, UserException {
        return cartItemService.updateCartItem(userId, cartItemId, quantity, cartItem);
    }
    public void clearCart(Integer userId) {
        cartService.clearCart(userId);
    }
}
