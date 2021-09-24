package com.employees.employeemanager.repo;

import com.employees.employeemanager.model.Employee;
import com.employees.employeemanager.model.WorkingHours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HoursRepo extends JpaRepository<WorkingHours, Long> {
    List<WorkingHours> getHoursByEmployeeId(Long employeeId);
}
