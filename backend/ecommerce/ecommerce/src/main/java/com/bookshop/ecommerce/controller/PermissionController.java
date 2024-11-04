package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.model.Permission;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import com.bookshop.ecommerce.service.impl.IPermissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/admin/permissions")
public class PermissionController {

    private IPermissionService permissionService;

    public PermissionController(IPermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Permission> createPermission(@RequestBody CreatePermissionRequest req) {
        Permission newPermission = permissionService.createPermission(req);
        return new ResponseEntity<>(newPermission, HttpStatus.OK);
    }

}
