import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from 'src/app/Models/employee';
import { EmployeeService } from 'src/app/Services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Hours } from 'src/app/Models/hours';
import { HoursService } from 'src/app/Services/hours.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-employee-working-hours',
  templateUrl: './employee-working-hours.component.html',
  styleUrls: ['./employee-working-hours.component.css']
})
export class EmployeeWorkingHoursComponent implements OnInit {

  private employeeId: number;

  public employee: Employee;
  public dataSrouce: any;

  public hours: Hours[];
  public filterHours: Hours[];
  public totalHours: number = 0;
  public startDate: Date = null;
  public endDate: Date = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, private hoursService: HoursService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user') == null) {
      this.router.navigate(['']);
      return;
    }
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.employeeId = Number(params.get('id'));
    })
    if (localStorage.getItem('user') != null) {
      this.employeeService.loggedEmployee = JSON.parse(localStorage.getItem('user'));
      if (this.employeeService.loggedEmployee.role.id != 1) {
        var id = this.employeeService.loggedEmployee.id;
        if (id != this.employeeId) {
          this.employeeId = id;
          this.router.navigate(["/hours", { id: id }]);
        }
      }
    }
    this.getEmployeeById();
  }

  public filterStartDate(event: any) {
    this.totalHours = 0;
    this.startDate = event.value;
    if (this.startDate === null) {
      if (this.endDate === null) {
        this.filterHours = this.hours;        
      }
      else {
        this.filterHours = this.hours.filter(x => x.dateTo <= this.endDate);
      }
    }
    else {
      if (this.endDate === null) {
        this.filterHours = this.hours.filter(x => x.dateFrom >= this.startDate);
      }
      else {
        this.filterHours = this.hours.filter(x => x.dateFrom >= this.startDate && x.dateTo <= this.endDate);
      }
    }
    this.filterHours.forEach(x => {
      this.totalHours += x.hours;
    });
  }

  public filterEndDate(event: any) {
    this.totalHours = 0;
    this.endDate = event.value;
    if (this.endDate === null) {
      if (this.startDate === null) {
        this.filterHours = this.hours;        
      }
      else {
        this.filterHours = this.hours.filter(x => x.dateFrom >= this.startDate);
      }
    }
    else {
      if (this.startDate === null) {
        this.filterHours = this.hours.filter(x => x.dateTo <= this.endDate);
      }
      else {
        this.filterHours = this.hours.filter(x => x.dateTo <= this.endDate && x.dateFrom >= this.startDate);
      }
    }
    this.filterHours.forEach(x => {
      this.totalHours += x.hours;
    });
  }

  public getEmployeeById(): void {
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      (response: Employee) => {
        this.employee = response;
        this.getHoursByEmployeeId(this.employee.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getHoursByEmployeeId(id: number): void {
    this.hoursService.getHoursByEmployeeId(id).subscribe(
      (response: Hours[]) => {
        this.hours = response;
        this.hours.forEach(x => {
          x.dateFrom = new Date(x.dateFrom);
          x.dateTo = new Date(x.dateTo);
          x.hours = (new Date(x.dateTo).getHours() - new Date(x.dateFrom).getHours());
          this.totalHours += x.hours;
        });
        this.filterHours = this.hours;
        var dates = this.hours.map(function (x) { return x.dateFrom });
        if (dates.length > 0) {
          var minDate = dates.reduce(function (a, b) { return a < b ? a : b; });
          var maxDate = dates.reduce(function (a, b) { return a > b ? a : b; });          
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddHours(addForm: NgForm): void {
    this.hours = addForm.value;
    console.log(this.hours);
    this.hoursService.addHours(addForm.value).subscribe(
      (response: Hours) => {
        console.log(response);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(hours: Hours, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-bs-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-bs-target", "#add");
    }
    container?.appendChild(button);
    button.click();
  }

}
