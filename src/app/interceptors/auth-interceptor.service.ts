import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { catchError, exhaustMap, Observable, switchMap, take, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService: AuthService, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.authService.user.pipe(take(1), exhaustMap(user=>{
            if(!user){
                return next.handle(req);
            }
            const modifiedReq = this.addTokenToHeader(req, this.authService.getToken());
            return next.handle(modifiedReq).pipe(
                catchError(error => {
                    if(error.status === 401) {
                        return this.handleRefreshToken(req, next);
                    }
                    return throwError(() => error);
                })
            );
        }));
    }

    handleRefreshToken(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.refreshToken().pipe(
            switchMap(response => {
                this.authService.saveTokenToLocalStorage(response);
                return next.handle(this.addTokenToHeader(req, "Bearer "+response.accessToken));
            }),
            catchError(error => {
                this.authService.logout();
                return throwError(() => error);
            })
        );
    }

    addTokenToHeader(request: HttpRequest<any>, token: any) {
        return request.clone({headers: request.headers.set('Authorization', token)});
    }
}