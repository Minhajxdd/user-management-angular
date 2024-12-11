import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { tap } from "rxjs";
import { userResponseData } from "./admin-dashboard/admin.mode";

@Injectable({
    providedIn: 'root'
})
export class AdminDashBoardService {

    private http = inject(HttpClient);

    getUserData() {
        const url = `http://localhost:3000/admin/userData`;
        return this.http.get<{data: userResponseData[]}>(url);
    }

    toggleBlock(userId: string) {
        const url = 'http://localhost:3000/admin/userblock';
        return this.http.patch(url, {userId});
    }

}