package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.Permission;
import com.bookshop.ecommerce.model.Role;
import com.bookshop.ecommerce.model.RolePermission;
import com.bookshop.ecommerce.repository.PermissionRepository;
import com.bookshop.ecommerce.repository.RolePermissionRepository;
import com.bookshop.ecommerce.repository.RoleRepository;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import com.bookshop.ecommerce.service.impl.IPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PermissionService implements IPermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    // add Permission

    public Permission createPermission(CreatePermissionRequest req) {
        // Tạo mới Permission
        Permission permission = new Permission();
        permission.setPermissionName(req.getPermissionName());
        permission.setPermissionDescription(req.getPermissionDescription());

        Permission savedPermission = permissionRepository.save(permission);

        Role role = roleRepository.findById(req.getRoleId()).orElseThrow(() -> new RuntimeException("Role not found"));

        RolePermission rolePermission = new RolePermission();
        rolePermission.setRole(role);
        rolePermission.setPermission(savedPermission);

        rolePermissionRepository.save(rolePermission);

        return savedPermission;
    }
}
