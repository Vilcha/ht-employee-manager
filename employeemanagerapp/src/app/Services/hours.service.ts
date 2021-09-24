import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hours } from '../Models/hours';


@Injectable({
  providedIn: 'root'
})
export class HoursService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getHoursByEmployeeId(employeeId: number): Observable<Hours[]>{
    return this.http.get<Hours[]>(`${this.apiServerUrl}/hours/${employeeId}`);
  }

  public addHours(hours: Hours): Observable<Hours>{
    return this.http.post<Hours>(`${this.apiServerUrl}/hours/add`, hours);
  }
}
