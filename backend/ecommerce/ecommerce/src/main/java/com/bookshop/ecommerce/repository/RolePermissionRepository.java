package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.RolePermission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolePermissionRepository extends JpaRepository<RolePermission, Integer> {
}
