import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { Role } from 'src/app/Services/role';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public weatherData: any;

  public time = new Date();
  public intervalId: any;

  public employees: Employee[];
  public allEmployees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  public addEmployee: Employee;

  public roles: Role[];
  public role: Role;
  public selectedRoleId: number;

  constructor(private employeeService: EmployeeService, private roleService: RoleService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(['']);
      return;
    } else {
      this.employeeService.loggedEmployee = JSON.parse(localStorage.getItem('user'));
      var id = this.employeeService.loggedEmployee.id;
      if (id != 1) {
        this.router.navigate(["/hours", { id: id }]);
      }
    }
    this.getEmployees();
    this.getRoles();
    this.getWeatherData();
    this.setIntervalId();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.allEmployees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    var randomstring = Math.random().toString(36).substr(2, 8);
    this.addEmployee = addForm.value;
    this.addEmployee.password = randomstring;
    this.employeeService.addEmployee(this.addEmployee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    employee.role = this.roles.find(x => x.id == this.selectedRoleId);
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      () => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.allEmployees) {
      if (employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.pin.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.employees = this.allEmployees;
    }
  }

  public getRoles(): void {
    this.roleService.getRoles().subscribe(
      (response: Role[]) => {
        this.roles = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-bs-target", "#addEmployeeModal");
    }
    if (mode === "edit") {
      this.editEmployee = employee;
      this.selectedRoleId = employee.role.id;
      button.setAttribute("data-bs-target", "#editEmployeeModal");
    }
    if (mode === "delete") {
      this.deleteEmployee = employee;
      button.setAttribute("data-bs-target", "#deleteEmployeeModal");
    }
    container?.appendChild(button);
    button.click();
  }

  public onShowHours(id: number) {
    this.router.navigate(["/hours", { id: id }]);
  }

  public getWeatherData() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Samobor&appid=d9359ef714f8b0056e149977d87a8ec1')
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); });
  }

  public setWeatherData(data: any) {
    this.weatherData = data;
    let sunsetTime = new Date(this.weatherData.sys.sunset * 1000);
    this.weatherData.sunset_time = sunsetTime.toLocaleDateString();
    let currentDate = new Date();
    this.weatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.weatherData.temp_celcius = (this.weatherData.main.temp - 273.15).toFixed(0);
    this.weatherData.temp_min = (this.weatherData.main.temp_min - 273.15).toFixed(0);
    this.weatherData.temp_max = (this.weatherData.main.temp_max - 273.15).toFixed(0);
    this.weatherData.feels_like = (this.weatherData.main.feels_like - 273.15).toFixed(0);
    this.weatherData.status = (this.weatherData.weather[0].main);
  }

  public setIntervalId() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

}
