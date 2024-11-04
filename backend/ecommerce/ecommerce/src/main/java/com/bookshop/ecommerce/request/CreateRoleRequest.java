package com.bookshop.ecommerce.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoleRequest {

    @JsonProperty("name")
    private String name;
    @JsonProperty("description")
    private String description;

}
