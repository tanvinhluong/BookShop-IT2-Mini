package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {
}
