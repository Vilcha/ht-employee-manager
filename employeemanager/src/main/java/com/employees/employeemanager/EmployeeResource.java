package com.employees.employeemanager;

import com.employees.employeemanager.exception.UserNotFoundException;
import com.employees.employeemanager.model.Employee;
import com.employees.employeemanager.model.Login;
import com.employees.employeemanager.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/employee")
public class EmployeeResource {

    private final EmployeeService employeeService;

    public EmployeeResource(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        return new ResponseEntity<>(employees, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") Long id) {
        Employee employee = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> getEmployeeByEmail(@RequestBody Login login) {
        Employee employee = employeeService.findEmployeeByEmail(login);
        if (employee == null){
            return new ResponseEntity<>("Incorrect e-mail", HttpStatus.BAD_REQUEST);
        }
        else {
            if (employee.getPassword().toLowerCase(Locale.ROOT).equals(login.getPassword().toLowerCase(Locale.ROOT))) {
                return new ResponseEntity<>(employee, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Incorrect password", HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        Employee newEmployee = employeeService.addEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee) {
        Employee updatedEmployee = employeeService.updateEmployee(employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Long id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
