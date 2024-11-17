package com.bookshop.ecommerce.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CreateAddressRequest {
        private String city;
        private String state;
        private String streetAddress;
        private String zipCode;
        private String mobile;
}
