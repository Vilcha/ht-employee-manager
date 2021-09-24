import { Role } from "./role";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    pin: string;
    imageUrl: string;
    role: Role;    
}