package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.CartItemException;
import com.bookshop.ecommerce.exception.UserException;
import com.bookshop.ecommerce.facade.ShoppingFacade;
import com.bookshop.ecommerce.model.CartItem;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.UpdateCartItemRequest;
import com.bookshop.ecommerce.response.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_items")
public class CartItemController {

    @Autowired
    private ShoppingFacade shoppingFacade;

    @Autowired
    public CartItemController(ShoppingFacade shoppingFacade) {
        this.shoppingFacade = shoppingFacade;
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse>deleteCartItemHandler(@PathVariable Integer cartItemId, @RequestHeader("Authorization")String jwt) throws CartItemException, UserException{

        User user = shoppingFacade.getUserByJwt(jwt);
        shoppingFacade.removeCartItem(user.getId(), cartItemId);

        ApiResponse res=new ApiResponse("Item Removed From Cart",true);

        return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItemHandler(
            @PathVariable Integer cartItemId,
            @RequestBody UpdateCartItemRequest updateRequest,
            @RequestHeader("Authorization") String jwt)
            throws CartItemException, UserException {

        User user = shoppingFacade.getUserByJwt(jwt);

        Integer userId = user.getId();
        Integer quantity = updateRequest.getQuantity();
        CartItem cartItem = updateRequest.getCartItem();

        // Assuming your update method will need the userId, cartItemId, and quantity
        CartItem updatedCartItem = shoppingFacade.updateCartItem(userId, cartItemId, quantity, cartItem);

        return new ResponseEntity<>(updatedCartItem, HttpStatus.ACCEPTED);
    }
}