import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/employee.service';
import { Login } from 'src/app/Models/login';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') != null) {
      this.router.navigate(['/employees']);
      return;
    }
  }

  public onLogin(loginForm: NgForm): void{
    this.employeeService.getEmployeeByEmail(loginForm.value).subscribe(
      (response: Employee) => {
        if (response != null) {
          this.employeeService.loggedEmployee = response;     
          console.log(this.employeeService.loggedEmployee);    
          localStorage.setItem('user', JSON.stringify(this.employeeService.loggedEmployee));
          if (this.employeeService.loggedEmployee.role.id == 1) {
            this.router.navigate(["/employees"]);            
          }
          else{
            var id = this.employeeService.loggedEmployee.id;
            this.router.navigate(["/hours", { id: id }]);
          }
        }
      },
      (error: HttpErrorResponse) => {
        document.getElementById("info-message").innerHTML = error.error;
        this.employeeService.loggedEmployee = null;      
        loginForm.reset();          
      }
    );
  }
}
