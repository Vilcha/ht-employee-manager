import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from './Models/employee';
import { EmployeeService } from './Services/employee.service';
import { Role } from './Services/role';
import { RoleService } from './Services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  get getLoggedEmployee(): Employee {
    return JSON.parse(localStorage.getItem('user'));
  }

  public onLogout(){
    this.employeeService.loggedEmployee = null;
    localStorage.removeItem('user');
    this.router.navigate([""]);
  }

  public onHome(){
    this.router.navigate(["/employees"]);
  }
}
