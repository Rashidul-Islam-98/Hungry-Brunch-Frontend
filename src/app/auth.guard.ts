import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, take, map } from "rxjs";
import { AuthService } from "./services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(take(1), map(user=>{
            const isAuth = user ? true : false;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(["/login"]);
        }))
    }
}