import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

interface ResponseUser {
    fullname: string;
    email: string;
    profileimage: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpClient);

    getUserData() {
        return this.http.get<ResponseUser>('http://localhost:3000')
    }

}