package com.employees.employeemanager.service;

import com.employees.employeemanager.model.Role;
import com.employees.employeemanager.repo.RoleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {
    private final RoleRepo roleRepo;

    @Autowired
    public RoleService(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    public List<Role> getAllRoles(){
        return roleRepo.findAll();
    }
}
