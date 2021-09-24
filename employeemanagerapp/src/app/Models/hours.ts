import { Employee } from "../employee";

export interface Hours {
    id: number;
    dateFrom: Date;
    dateTo: Date;
    hours: number;
    employee: Employee
}