import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { debounceTime, tap } from "rxjs";
import { userResponseData } from "./admin-dashboard/admin.mode";

@Injectable({
    providedIn: 'root'
})
export class AdminDashBoardService {

    private http = inject(HttpClient);

    getUserData(keyword?: string) {
        let url = `http://localhost:3000/admin/userData`;
        if(keyword) {
            url = `http://localhost:3000/admin/userData?keyword=${keyword}`
        }

        return this.http.get<{data: userResponseData[]}>(url)
        .pipe(
            debounceTime(1000)
        )
        
    }

    toggleBlock(userId: string) {
        const url = 'http://localhost:3000/admin/userblock';
        return this.http.patch(url, {userId});
    }

}