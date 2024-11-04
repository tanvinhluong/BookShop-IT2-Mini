package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.model.Role;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.CreateRoleRequest;
import com.bookshop.ecommerce.service.impl.IRoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin/roles")
public class RoleController {

    private IRoleService roleService;

    public RoleController(IRoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping("/create")
    public ResponseEntity<Role> createRole(@RequestBody CreateRoleRequest req) {
        Role newRole = roleService.createRole(req);
        return new ResponseEntity<>(newRole, HttpStatus.OK);
    }

    @PostMapping("/{userId}/assign/{roleId}")
    public ResponseEntity<User> assignRoleToUser(@PathVariable Integer userId, @PathVariable Integer roleId) {
        User user = roleService.assignRoleToUser(userId, roleId).getUser();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

}
