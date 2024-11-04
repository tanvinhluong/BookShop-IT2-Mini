package com.bookshop.ecommerce.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreatePermissionRequest {

    private String permissionName;
    private String permissionDescription;
    private Integer roleId;

}
