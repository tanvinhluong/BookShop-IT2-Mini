package com.bookshop.ecommerce.service.impl;

import com.bookshop.ecommerce.exception.PermissionException;
import com.bookshop.ecommerce.model.Permission;
import com.bookshop.ecommerce.model.RolePermission;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import org.springframework.data.domain.Page;

public interface IPermissionService {
    Permission createPermission(CreatePermissionRequest req);
    Page<Permission> getAllPermissions (Integer pageNumber, Integer pageSize);
    public String deletePermission (Integer permissionId) throws PermissionException;
    public Permission updatePermission (CreatePermissionRequest createPermissionRequest, Integer permissionId) throws PermissionException;
    public Permission findPermissionById(Integer id) throws PermissionException;
    public RolePermission assignPermissionToRole(Integer permissionId, Integer roleId);
    public String removePermissionOffRole(Integer permissionId, Integer roleId);
}
