package com.employees.employeemanager.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "working_hours")
public class WorkingHours implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private Date dateFrom;
    private Date dateTo;
    @ManyToOne
    @JoinColumn(name = "EmployeeId")
    private Employee employee;

    public WorkingHours() {
    }

    public WorkingHours(Long id, Date dateFrom, Date dateTo, Employee employee) {
        this.id = id;
        this.dateFrom = dateFrom;
        this.dateTo = dateTo;
        this.employee = employee;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDateFrom() {
        return dateFrom;
    }

    public void setDateFrom(Date dateFrom) {
        this.dateFrom = dateFrom;
    }

    public Date getDateTo() {
        return dateTo;
    }

    public void setDateTo(Date dateTo) {
        this.dateTo = dateTo;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    @Override
    public String toString() {
        return "WorkingHours{" +
                "id=" + id +
                ", dateFrom=" + dateFrom +
                ", dateTo=" + dateTo +
                ", employee=" + employee +
                '}';
    }
}
