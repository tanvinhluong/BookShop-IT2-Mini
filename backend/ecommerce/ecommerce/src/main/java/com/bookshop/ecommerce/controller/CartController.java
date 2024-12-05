package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.facade.ShoppingFacade;
import com.bookshop.ecommerce.model.Cart;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.AddItemRequest;
import com.bookshop.ecommerce.response.ApiResponse;
import com.bookshop.ecommerce.service.impl.ICartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private ShoppingFacade shoppingFacade;

    @Autowired
    private ICartService cartService;

    @Autowired
    public CartController(ShoppingFacade shoppingFacade) {
        this.shoppingFacade = shoppingFacade;
    }

    @PostMapping("/create")
    public ResponseEntity<Cart> createCartHandler(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = shoppingFacade.getUserByJwt(jwt);
        Cart cart = cartService.createCart(user);
        return new ResponseEntity<Cart>(cart, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCartHandler(@RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = shoppingFacade.getUserByJwt(jwt);
        Cart cart = shoppingFacade.getUserCart(user.getId());
        System.out.println("cart - " + cart.getUser().getEmail());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req, @RequestHeader("Authorization") String jwt) throws UserException, ProductException {
        User user = shoppingFacade.getUserByJwt(jwt);
        shoppingFacade.addItemToCart(user.getId(), req);
        ApiResponse res = new ApiResponse("Item Added To Cart Successfully", true);
        return new ResponseEntity<ApiResponse>(res, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse> clearCart(@RequestHeader("Authorization") String jwt) throws UserException {
        User user = shoppingFacade.getUserByJwt(jwt);
        shoppingFacade.clearCart(user.getId());
        ApiResponse res = new ApiResponse("Cart Cleared Successfully", true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
