package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.exception.PermissionException;
import com.bookshop.ecommerce.exception.RoleException;
import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.RoleRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.repository.UserRoleRepository;
import com.bookshop.ecommerce.request.CreatePermissionRequest;
import com.bookshop.ecommerce.request.CreateRoleRequest;
import com.bookshop.ecommerce.service.impl.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService implements IRoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    public Role createRole(CreateRoleRequest req) {
        Role role = new Role();
        role.setName(req.getName());
        role.setDescription(req.getDescription());
        return roleRepository.save(role);
    }

    public UserRole assignRoleToUser(Integer userId, Integer roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        return userRoleRepository.save(userRole);
    }

    public String removeRoleOffUser(Integer userId, Integer roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Tìm UserRole trong bảng trung gian
        UserRole userRole = userRoleRepository.findByUserIdAndRoleId(userId, roleId)
                .orElseThrow(() -> new RuntimeException("UserRole not found"));

        userRoleRepository.delete(userRole);

        return "Remove user role sucessfully";
    }

    public Page<Role> getAllRoles (Integer pageNumber, Integer pageSize) {
        if (pageSize == null || pageSize <= 0) {
            List<Role> roles = roleRepository.findAll();
            return new PageImpl<>(roles);
        } else {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);
            return roleRepository.findAll(pageable);
        }
    }

    public String deleteRole (Integer roleId) throws RoleException {
        Role  role = findRoleById(roleId);
        roleRepository.delete(role);
        return "Role deleted sucessfully";
    }

    public Role updateRole (CreateRoleRequest createRoleRequest, Integer roleId) throws RoleException {
        Role role = findRoleById(roleId);
        role.setName(createRoleRequest.getName());
        role.setDescription(createRoleRequest.getDescription());

        return roleRepository.save(role);
    }

    public Role findRoleById(Integer id) throws RoleException {
        Optional<Role> role = roleRepository.findById(id);
        if(role.isPresent()){
            return role.get();
        }
        throw new RoleException("Role not found");
    }
}
