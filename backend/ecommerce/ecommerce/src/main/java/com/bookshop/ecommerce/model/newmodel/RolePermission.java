package com.bookshop.ecommerce.model.newmodel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;


@Entity
@Table(name = "role_permission")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RolePermission implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ROLE_ID")
    private Role role;

    @ManyToOne
    @JoinColumn(name = "PERMISSION_ID")
    private Permission permission;
}
