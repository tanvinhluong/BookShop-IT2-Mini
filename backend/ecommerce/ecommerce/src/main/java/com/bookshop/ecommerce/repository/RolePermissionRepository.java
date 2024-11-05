package com.bookshop.ecommerce.repository;

import com.bookshop.ecommerce.model.RolePermission;
import com.bookshop.ecommerce.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RolePermissionRepository extends JpaRepository<RolePermission, Integer> {

    @Query("SELECT rp FROM RolePermission rp WHERE rp.role.id = :roleId AND rp.permission.id = :permissionId")
    Optional<RolePermission> findByPermissionIdAndRoleId(
            @Param("permissionId") Integer permissionId,
            @Param("roleId") Integer roleId
    );
}
