package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.PermissionException;
import com.bookshop.ecommerce.exception.RoleException;
import com.bookshop.ecommerce.model.Permission;
import com.bookshop.ecommerce.model.Role;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import com.bookshop.ecommerce.request.CreateRoleRequest;
import com.bookshop.ecommerce.service.impl.IRoleService;
import org.springframework.data.domain.Page;
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

    @DeleteMapping("/{userId}/remove/{roleId}")
    public ResponseEntity<String> removeRoleOffUser(@PathVariable Integer userId, @PathVariable Integer roleId) {
        String respond = roleService.removeRoleOffUser(userId, roleId);
        return new ResponseEntity<>(respond, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<Role>> findAllRoleHandler(
            @RequestParam(defaultValue = "0") Integer pageNumber, // Giá trị mặc định là 0
            @RequestParam(defaultValue = "0") Integer pageSize
    ){
        Page<Role> res = roleService.getAllRoles(pageNumber, pageSize);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{roleId}")
    public ResponseEntity<String> deleteRoleHandler(@PathVariable Integer roleId) {
        try {
            roleService.deleteRole(roleId);
            return new ResponseEntity<>("Role deleted successfully", HttpStatus.OK);
        } catch (RoleException e) {
            // Trả về lỗi nếu không tìm thấy Role
            return new ResponseEntity<>("Role not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{roleId}")
    public ResponseEntity<String> updateRoleHandler(
            @PathVariable Integer roleId,
            @RequestBody CreateRoleRequest request
    ) {
        try {
            // Gọi service để cập nhật Role
            roleService.updateRole( request, roleId);
            return new ResponseEntity<>("Role updated successfully", HttpStatus.OK);
        } catch (RoleException e) {
            // Trả về lỗi nếu không tìm thấy Role
            return new ResponseEntity<>("Role not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
