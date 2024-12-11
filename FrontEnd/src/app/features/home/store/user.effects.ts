import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../user.service";
import { LOAD_USER_DATA, loadUserDataSuccess, UPLOAD_PHOTO, uploadPhotoSuccess } from "./user.action";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";
import { ProfileService } from "../pages/profile-page/profile.service";
import { userModel } from "./user.model";

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);
    private profileService = inject(ProfileService)

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_USER_DATA),
        exhaustMap(() => this.userService.getUserData()
            .pipe(
                map((data) => {
                    const userData: userModel = {
                        fullName: data.fullname,
                        email: data.email,
                        profileImage: data.profileimage,
                        role: data.role
                    }

                    return loadUserDataSuccess(userData);
                }),
                catchError(() => EMPTY)

            )
        ))
    )


    uploadImage$ = createEffect(() => this.actions$.pipe(
        ofType(UPLOAD_PHOTO),
        exhaustMap((action) => this.profileService.uploadImage(action.file)
            .pipe(
                map((data) => {
                    return uploadPhotoSuccess(data)
                }),
                catchError(() => EMPTY)

            )
        ))
    )

}
