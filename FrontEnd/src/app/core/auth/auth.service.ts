import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { loginData, signupData } from "./auth.model";
import { jwtDecode } from 'jwt-decode';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

    private isLoggedIn: boolean = false;

    sentSignupRequest(data: signupData) {
        const url = `http://localhost:3000/auth/register`;

        return this.http.post(url, data)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                    return throwError(() => err.error as { error: string });
                })
            )
    }

    login(data: loginData) {
        const url = 'http://localhost:3000/auth/login';

        return this.http.post(url, data)
            .pipe(
                map((response: any) => {
                    localStorage.setItem('JWT_Token', response.token);
                    this.isLoggedIn = true;
                    return true;
                }),
                catchError((err: HttpErrorResponse) => {
                    this.isLoggedIn = false;
                    return throwError(() => err.error as { error: string });
                })
            )
    }


    logout(): void {
        localStorage.removeItem('JWT_Token');
        this.isLoggedIn = false;
    }


    private isTokenValid(token: string): boolean {
        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
            return decodedToken.exp > currentTime;
        } catch (error) {
            return false;
        }
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('JWT_Token');
        if (token && this.isTokenValid(token)) {
            this.isLoggedIn = true;
            return true;
        }
        this.logout();
        return false;
    }


} 