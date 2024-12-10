import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../user.service";
import { LOAD_USER_DATA, loadUserDataSuccess } from "./user.action";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class UserEffects {
    private actions$ = inject(Actions);
    private userService = inject(UserService);

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(LOAD_USER_DATA),
        exhaustMap(() => this.userService.getUserData()
            .pipe(
                map((data) => {
                    return loadUserDataSuccess({
                        fullName: data.fullname,
                        email: data.email,
                        profileImage: data.profileimage,
                        role: data.role
                    })
                }),
                catchError(() => EMPTY)

            )
        ))
    )
}
