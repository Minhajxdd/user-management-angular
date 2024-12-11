import { inject } from '@angular/core';
import  { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuardService: CanActivateFn = () => {
    
    let isAuthenticated = inject(AuthService).isAuthenticated();
    let router = inject(Router);

    if(isAuthenticated) {
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
}

export const AuthGuardServiceLogged: CanActivateFn = () => {
    
    let isAuthenticated = inject(AuthService).isAuthenticated();
    let router = inject(Router);

    if(isAuthenticated) {
        router.navigate(['']);
        return false;
    } else {
        return true;
    }
}


export const AuthGuardServiceValidAdmin: CanActivateFn = () => {

    let isAuthenticated = inject(AuthService).isAdminAuthenticated();
    let router = inject(Router);

    if(isAuthenticated) {
        return true;
    } else {
        router.navigate(['']);
        return false;
    }
    

}