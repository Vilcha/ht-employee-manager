import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { EmployeeWorkingHoursComponent } from "./Components/EmployeeComponent/employee-working-hours/employee-working-hours.component";
import { EmployeesComponent } from "./Components/EmployeeComponent/employees/employees.component";
import { LoginComponent } from "./Components/LoginComponent/login/login.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'hours', component: EmployeeWorkingHoursComponent },
    { path: 'employees', component: EmployeesComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, EmployeeWorkingHoursComponent, EmployeesComponent]