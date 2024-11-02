package com.bookshop.ecommerce.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AddItemRequest {

    private Integer productId;
    private int quantity = 1;
    private Integer price;

}
