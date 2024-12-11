import { createReducer, on } from "@ngrx/store";
import { userState } from "./user.state";
import { loadUserData, loadUserDataSuccess, uploadPhotoSuccess } from "./user.action";

const _userReducer = createReducer(
    userState,
    on(loadUserDataSuccess, (state, action) => {
        return {
            ...action
        }
    }),
    on(uploadPhotoSuccess, (state, action) => {
        return {
            ...state,
            profileImage: action.imageUrl
        };
    })
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}