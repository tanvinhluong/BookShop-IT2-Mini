package com.bookshop.ecommerce.request;

import com.bookshop.ecommerce.model.Address;
import com.bookshop.ecommerce.model.Cart;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {

    private Integer cartId;
    private Integer addressId;
    private List<String> promotionCode;

}
