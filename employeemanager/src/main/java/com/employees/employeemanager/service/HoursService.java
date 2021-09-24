package com.employees.employeemanager.service;

import com.employees.employeemanager.model.Role;
import com.employees.employeemanager.model.WorkingHours;
import com.employees.employeemanager.repo.EmployeeRepo;
import com.employees.employeemanager.repo.HoursRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class HoursService {

    private final HoursRepo hoursRepo;

    @Autowired
    public HoursService(HoursRepo hoursRepo) {
        this.hoursRepo = hoursRepo;
    }

    public List<WorkingHours> getHoursByEmployeeId(Long employeeId){
        return hoursRepo.getHoursByEmployeeId(employeeId);
    }
}
