package com.bookshop.ecommerce.request;

import com.bookshop.ecommerce.model.CartItem;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCartItemRequest {

    private Integer userId;
    private Integer quantity;
    private CartItem cartItem;

}
