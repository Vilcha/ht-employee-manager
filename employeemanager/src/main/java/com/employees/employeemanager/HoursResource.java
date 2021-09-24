package com.employees.employeemanager;

import com.employees.employeemanager.model.Role;
import com.employees.employeemanager.model.WorkingHours;
import com.employees.employeemanager.service.HoursService;
import com.employees.employeemanager.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hours")
public class HoursResource {
    private final HoursService hoursService;

    public HoursResource(HoursService hoursService) {
        this.hoursService = hoursService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<WorkingHours>> getHoursByEmployeeId(@PathVariable("id") Long id){
        List<WorkingHours> hours = hoursService.getHoursByEmployeeId(id);
        return new ResponseEntity<>(hours, HttpStatus.OK);
    }
}
