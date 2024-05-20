import { Injectable } from "@angular/core";
import { baseUrl } from "src/environments/environment";
import { IUser, Role } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root'})
export class UserService {
    baseUrl: string = baseUrl;

    constructor(private http: HttpClient, private authService: AuthService) {}

    getUser(id: string) {
        return this.http.get<IUser>(baseUrl+"user/get/"+id);
    }

    getUserRole() {
        const userRoles = this.authService.getUserRole();
        var userRole = "ROLE_CUSTOMER";
        const rolePriority = ["ROLE_ADMIN", "ROLE_EMPLOYEE"];

        for (const role of rolePriority) {
            if (userRoles.some(userRole => userRole.authority === role)) {
                userRole = role;
                break;
            }
        }
    
        return userRole;
    }
}