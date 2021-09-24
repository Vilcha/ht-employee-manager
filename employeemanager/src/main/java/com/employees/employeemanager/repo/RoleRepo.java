package com.employees.employeemanager.repo;

import com.employees.employeemanager.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {

}
