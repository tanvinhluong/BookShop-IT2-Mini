package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.RoleException;
import com.bookshop.ecommerce.model.Role;
import com.bookshop.ecommerce.model.UserRole;
import com.bookshop.ecommerce.request.CreateRoleRequest;
import org.springframework.data.domain.Page;

public interface IRoleService {
    Role createRole(CreateRoleRequest req);
    UserRole assignRoleToUser(Integer userId, Integer roleId);
    public Page<Role> getAllRoles (Integer pageNumber, Integer pageSize);
    public String deleteRole (Integer roleId) throws RoleException;
    public Role updateRole (CreateRoleRequest createRoleRequest, Integer roleId) throws RoleException;
    public Role findRoleById(Integer id) throws RoleException;
    public String removeRoleOffUser(Integer userId, Integer roleId);
}
