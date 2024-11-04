package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.model.Role;
import com.bookshop.ecommerce.model.UserRole;
import com.bookshop.ecommerce.request.CreateRoleRequest;

public interface IRoleService {
    Role createRole(CreateRoleRequest req);
    UserRole assignRoleToUser(Integer userId, Integer roleId);
}
