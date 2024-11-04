package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
}
