import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { IUser, Role } from "../models/user.model";
import { IAuthResponse, IRefreshTokenResponse } from "../models/auth-response.model";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../models/jwt-payload.model";
import { HttpClient } from "@angular/common/http";
import { baseUrl } from "src/environments/environment";

@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor(private router: Router, private http: HttpClient){}

    user = new BehaviorSubject<IUser |null>(null);
    userRole: Role[] = [];
    baseUrl: string = baseUrl;

    getToken(): any{
        let temp =localStorage.getItem("accessToken"); 
        if(temp){
            return JSON.parse(temp); 
        }
    }

    getRefreshToken(): any{
        let temp =localStorage.getItem("refreshToken"); 
        if(temp){
            return JSON.parse(temp); 
        }
    }

    getUser(): IUser | null{
        let token = localStorage.getItem("accessToken");
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
        localStorage.setItem('accessToken', JSON.stringify("Bearer "+authResponse.accessToken));
        if(authResponse.refreshToken){
            localStorage.setItem('refreshToken', JSON.stringify(authResponse.refreshToken));
        }
        localStorage.setItem('forceChangePassword', JSON.stringify(authResponse.forceChangePassword));
        this.user.next(this.getUser());
        this.router.navigate(['/']);
    }

    refreshToken() {
        var refreshToken = this.getRefreshToken();
        return this.http.post<IRefreshTokenResponse>(`${baseUrl}auth/refresh-token`,{token: refreshToken});
    }

    saveTokenToLocalStorage(refreshTokenResponse: IRefreshTokenResponse) {
        localStorage.setItem('accessToken', JSON.stringify("Bearer "+refreshTokenResponse.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(refreshTokenResponse.refreshToken));
    }

    logout(){
        localStorage.removeItem('accessToken');
        if(localStorage.getItem('refreshToken')) {
            localStorage.removeItem('refreshToken');
        }
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