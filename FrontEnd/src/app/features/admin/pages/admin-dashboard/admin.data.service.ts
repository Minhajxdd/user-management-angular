import { Injectable } from "@angular/core";
import { userResponseData } from "./admin.mode";


@Injectable({
    providedIn: 'root'
})
export class AdminDashboardData {
    private editFormData!: userResponseData;

    setEditData(data: userResponseData) {
        this.editFormData = data;
    }

    getData() {
        return this.editFormData;
    }
}