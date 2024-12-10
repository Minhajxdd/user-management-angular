import { createAction, props } from "@ngrx/store";
import { userModel } from "./user.model";

export const LOAD_USER_DATA = '[user page] load data'
const LOAD_USER_DATA_SUCCESS = '[user page] load data success' 

export const loadUserData = createAction(LOAD_USER_DATA);

export const loadUserDataSuccess = createAction(LOAD_USER_DATA_SUCCESS, props<userModel>());