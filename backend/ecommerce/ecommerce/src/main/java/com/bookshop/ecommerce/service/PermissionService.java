package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.PermissionException;
import com.bookshop.ecommerce.exception.ProductException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.PermissionRepository;
import com.bookshop.ecommerce.repository.RolePermissionRepository;
import com.bookshop.ecommerce.repository.RoleRepository;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import com.bookshop.ecommerce.service.impl.IPermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PermissionService implements IPermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RolePermissionRepository rolePermissionRepository;

    // add Permission
    @Override
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

    public RolePermission assignPermissionToRole(Integer permissionId, Integer roleId) {
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        RolePermission permissionRole = new RolePermission();
        permissionRole.setPermission(permission);
        permissionRole.setRole(role);
        return rolePermissionRepository.save(permissionRole);
    }

    public String removePermissionOffRole(Integer permissionId, Integer roleId) {

        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new RuntimeException("Permission not found"));

        // Tìm RolePermission trong bảng trung gian
        RolePermission rolePermission = rolePermissionRepository.findByPermissionIdAndRoleId(permissionId, roleId)
                .orElseThrow(() -> new RuntimeException("PermissionRole not found"));

        rolePermissionRepository.delete(rolePermission);

        return "Remove permission role successfully";
    }

    @Override
    public Page<Permission> getAllPermissions (Integer pageNumber, Integer pageSize) {
        if (pageSize == null || pageSize <= 0) {
            List<Permission> permissions = permissionRepository.findAll();
            return new PageImpl<>(permissions);
        } else {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            return permissionRepository.findAll(pageable);
        }
    }

    @Override
    public String deletePermission (Integer permissionId) throws PermissionException {
        Permission permission = findPermissionById(permissionId);
        permissionRepository.delete(permission);
        return "Permission deleted sucessfully";
    }

    @Override
    public Permission updatePermission (CreatePermissionRequest createPermissionRequest, Integer permissionId) throws PermissionException {
        Permission permission = findPermissionById(permissionId);
        permission.setPermissionName(createPermissionRequest.getPermissionName());
        permission.setPermissionDescription(createPermissionRequest.getPermissionDescription());

        return permissionRepository.save(permission);
    }

    @Override
    public Permission findPermissionById(Integer id) throws PermissionException {
        Optional<Permission> permission = permissionRepository.findById(id);
        if(permission.isPresent()){
            return permission.get();
        }
        throw new PermissionException("Permission not found");
    }
}
