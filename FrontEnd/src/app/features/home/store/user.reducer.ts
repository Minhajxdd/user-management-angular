import { createReducer, on } from "@ngrx/store";
import { userState } from "./user.state";
import { loadUserData, loadUserDataSuccess } from "./user.action";

const _userReducer = createReducer(
    userState,
    on(loadUserDataSuccess, (state, action) => {
        return {
            ...action
        }
    })
)

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}