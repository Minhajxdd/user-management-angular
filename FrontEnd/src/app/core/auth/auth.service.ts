import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { signupData } from "./auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

    sentSignupRequest(data: signupData) {
        const url = `http://localhost:3000/auth/register`;
        
        return this.http.post(url, data)
        .pipe(
            catchError((err: HttpErrorResponse) => {
                return throwError(() => err.error as {error: string});
            })
        )
    }
    
} 