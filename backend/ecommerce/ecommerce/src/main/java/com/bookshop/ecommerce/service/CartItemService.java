package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.CartItemException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.CartItemRepository;
import com.bookshop.ecommerce.repository.CartRepository;
import com.bookshop.ecommerce.service.impl.ICartItemService;
import com.bookshop.ecommerce.service.impl.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemService implements ICartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;
    @Autowired
    private IUserService userService;
    @Autowired
    private CartRepository cartRepository;


    @Override
    public CartItem createCartItem(CartItem cartItem) {
        cartItem.setQuantity(1);
        cartItem.setPrice(cartItem.getPrice() * cartItem.getQuantity());
        CartItem newCartItem = cartItemRepository.save(cartItem);
        return newCartItem;
    }

    @Override
    public CartItem updateCartItem(Integer userId, Integer id, Integer quantity, CartItem cartItem) throws CartItemException, UserException {
        cartItem = findCartItemById(id);
        User user = userService.findUserById(cartItem.getCart().getUser().getId());
        if(user.getId() != userId){
            throw new UserException("User id not matched");
        }
        cartItem.setQuantity(quantity);
        cartItem.setPrice((int) (quantity * cartItem.getProductDetail().getPrice()));
        return cartItemRepository.save(cartItem);

    }

    @Override
    public void deleteCartItem(Integer cartItemId) {

    }

    @Override
    public CartItem isCartItemExists(Cart cart, ProductDetail productDetail, Integer userId) {
        return cartItemRepository.isCartItemExists(cart, productDetail.getProduct(),userId);
    }

    @Override
    public void removeCartItem(Integer userId, Integer cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);
        User user = userService.findUserById(cartItem.getCart().getUser().getId());
        User requestedUser = userService.findUserById(userId);
        if(user.getId().equals(requestedUser.getId())) {
            cartItemRepository.deleteById(cartItemId);
        }
        else{
            throw new UserException("you cant remove another user item");
        }
    }

    @Override
    public CartItem findCartItemById(Integer cartItemId) throws CartItemException {
        Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);
        if(cartItem.isPresent()){
            return cartItem.get();
        }
        else{
            throw new CartItemException("Cart item not found");
        }

    }
}
