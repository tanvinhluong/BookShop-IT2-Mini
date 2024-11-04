package com.bookshop.ecommerce.service;

import com.bookshop.ecommerce.model.*;
import com.bookshop.ecommerce.repository.RoleRepository;
import com.bookshop.ecommerce.repository.UserRepository;
import com.bookshop.ecommerce.repository.UserRoleRepository;
import com.bookshop.ecommerce.request.CreateRoleRequest;
import com.bookshop.ecommerce.service.impl.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
