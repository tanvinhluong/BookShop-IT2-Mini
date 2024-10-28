package com.bookshop.ecommerce.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateSupplierRequest {
    private String supplierName;
    private String supplierDescription;
}
