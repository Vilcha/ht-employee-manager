import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "./role";

@Injectable({
    providedIn: 'root'
})
export class RoleService{
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    public getRoles(): Observable<Role[]>{
        return this.http.get<Role[]>(`${this.apiServerUrl}/role`);
    }
}
