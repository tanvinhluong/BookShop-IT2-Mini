package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.CartRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.request.AddItemRequest;
import com.bookshop.ecommerce.service.impl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService implements ICartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ICartItemService cartItemService;
    @Autowired
    private IProductDetailService productDetailService;
    @Autowired
    private UserRepository userRepository;


    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addToCartItem(Integer userId, AddItemRequest addItemRequest) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        ProductDetail productDetail = productDetailService.findProductDetailByPrdId(addItemRequest.getProductId());
        CartItem isPresent = cartItemService.isCartItemExists(cart, productDetail, userId);
        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductDetail(productDetail);
            cartItem.setQuantity(addItemRequest.getQuantity());
            int price = (int) (addItemRequest.getQuantity() * cartItem.getProductDetail().getPrice());
            cartItem.setPrice(price);
            CartItem createdCartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);
        }
        return "item added to cart";
    }

    @Override
    public Cart findUserCart(Integer userId) {
        Cart cart = cartRepository.findByUserId(userId);
        int totalPrice = 0;
        int totalItem = 0;


        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalItem = totalItem + cartItem.getQuantity();
        }

        cart.setUser(cart.getUser());
        cart.setCartItems(cart.getCartItems());
        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        return cartRepository.save(cart);
    }

    public void clearCart(Integer userId) {
        User user = null;
        try {
            user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserException("User not found"));
        } catch (UserException e) {
            throw new RuntimeException(e);
        }

        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart != null) {
            cart.getCartItems().clear();
            cartRepository.save(cart);
        }
    }
}
