import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IUser, Role } from "../models/user.model";
import { IAuthResponse } from "../models/auth-response.model";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../models/jwt-payload.model";

@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor(private router: Router){}

    user = new BehaviorSubject<IUser |null>(null);
    userRole: Role[] = [];
    getToken(): any{
        let temp =localStorage.getItem("token"); 
        if(temp){
            return JSON.parse(temp); 
        }
    }

    getUser(): IUser | null{
        let token = localStorage.getItem("token");
        if (token) {
            let user: IUser = {
                id: "",
                userName: "",
                role: []
            };
            let decodeToken: JwtPayload = jwtDecode(token);
            user.id = decodeToken.id;
            user.userName = decodeToken.sub;
            user.role = decodeToken.role;
            this.userRole = decodeToken.role;
            return user;
        }
        return null;
    }

    getUserRole() {
        return this.userRole;
    }
    

    login(authResponse: IAuthResponse){
        localStorage.setItem('token', JSON.stringify("Bearer "+authResponse.token))
        localStorage.setItem('forceChangePassword', JSON.stringify(authResponse.forceChangePassword))
        this.user.next(this.getUser());
        this.router.navigate(['/']);
    }

    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('forceChangePassword');
        this.user.next(null);
        this.router.navigate(['/login']);
    }

    autoLogin(){
        const userData = this.getUser();
        if(!userData){
            return;
        }
        this.user.next(userData);
    }
}