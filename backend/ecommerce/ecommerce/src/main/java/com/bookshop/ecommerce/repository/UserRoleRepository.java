package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRoleRepository extends JpaRepository<UserRole, Integer> {
}
