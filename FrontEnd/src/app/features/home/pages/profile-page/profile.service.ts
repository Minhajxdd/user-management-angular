import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { imageModel } from "../../store/user.model";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private http = inject(HttpClient);
    private imageUploadUrl = `http://localhost:3000/profile`;

    uploadImage(file: File) {
        const formData = new FormData();
        formData.append(`profile`, file);
        return this.http.post<imageModel>(this.imageUploadUrl, formData);
    }

}