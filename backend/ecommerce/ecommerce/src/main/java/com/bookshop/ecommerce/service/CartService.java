package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.CartRepository;
import com.bookshop.ecommerce.request.AddItemRequest;
import com.bookshop.ecommerce.service.impl.ICartItemService;
import com.bookshop.ecommerce.service.impl.ICartService;
import com.bookshop.ecommerce.service.impl.IProductDetailService;
import com.bookshop.ecommerce.service.impl.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService implements ICartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ICartItemService cartItemService;
    @Autowired
    private IProductDetailService productDetailService;


    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addToCartItem(Integer userId, AddItemRequest addItemRequest) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        ProductDetail productDetail = productDetailService.findProductDetailById(addItemRequest.getProductId());
        CartItem isPresent = cartItemService.isCartItemExists(cart, productDetail, userId);
        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProductDetail(productDetail);
            cartItem.setQuantity(addItemRequest.getQuantity());
            int price = (int) (addItemRequest.getQuantity() * productDetail.getPrice());
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
        int totalDiscountedPrice = 0;
        int totalItem = 0;


        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalItem = totalItem + cartItem.getQuantity();
        }

        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        return cartRepository.save(cart);
    }
}
