package com.bookshop.ecommerce.controller;

import com.bookshop.ecommerce.exception.PermissionException;
import com.bookshop.ecommerce.model.Permission;
import com.bookshop.ecommerce.model.Product;
import com.bookshop.ecommerce.model.User;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import com.bookshop.ecommerce.service.impl.IPermissionService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/admin/permissions")
public class PermissionController {

    @Autowired
    private IPermissionService permissionService;

    public PermissionController(IPermissionService permissionService) {
        this.permissionService = permissionService;
    }

    @PostMapping("/create")
    public ResponseEntity<Permission> createPermission(@RequestBody CreatePermissionRequest req) {
        Permission newPermission = permissionService.createPermission(req);
        return new ResponseEntity<>(newPermission, HttpStatus.OK);
    }

    @PostMapping("/{roleId}/assign/{permissionId}")
    public ResponseEntity<Permission> assignPermissionToRole(@PathVariable Integer permissionId, @PathVariable Integer roleId) {
        Permission permission = permissionService.assignPermissionToRole(permissionId, roleId).getPermission();
        return new ResponseEntity<>(permission, HttpStatus.OK);
    }

    @DeleteMapping("/{roleId}/remove/{permissionId}")
    public ResponseEntity<String> removePermissionOffRole(@PathVariable Integer permissionId, @PathVariable Integer roleId) {
        String respond = permissionService.removePermissionOffRole(permissionId, roleId);
        return new ResponseEntity<>(respond, HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<Page<Permission>> findAllPermissionHandler(
            @RequestParam(defaultValue = "0") Integer pageNumber, // Giá trị mặc định là 0
            @RequestParam(defaultValue = "0") Integer pageSize
    ){
        Page<Permission> res = permissionService.getAllPermissions(pageNumber, pageSize);
        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{permissionId}")
    public ResponseEntity<String> deletePermissionHandler(@PathVariable Integer permissionId) {
        try {
            permissionService.deletePermission(permissionId);
            return new ResponseEntity<>("Permission deleted successfully", HttpStatus.OK);
        } catch (PermissionException e) {
            // Trả về lỗi nếu không tìm thấy Permission
            return new ResponseEntity<>("Permission not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{permissionId}")
    public ResponseEntity<String> updatePermissionHandler(
            @PathVariable Integer permissionId,
            @RequestBody  CreatePermissionRequest request
    ) {
        try {
            // Gọi service để cập nhật Permission
            permissionService.updatePermission( request, permissionId);
            return new ResponseEntity<>("Permission updated successfully", HttpStatus.OK);
        } catch (PermissionException e) {
            // Trả về lỗi nếu không tìm thấy Permission
            return new ResponseEntity<>("Permission not found: " + e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
