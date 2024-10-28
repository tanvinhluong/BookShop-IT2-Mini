package com.bookshop.ecommerce.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCategoryRequest {
    private String categoryName;
    private String categoryDescription;
    private String imgUrl;
}
