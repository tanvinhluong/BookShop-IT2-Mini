package com.bookshop.ecommerce.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentUpdateDTO {

    private Integer orderId;
    private Integer paymentInfoId;

}
