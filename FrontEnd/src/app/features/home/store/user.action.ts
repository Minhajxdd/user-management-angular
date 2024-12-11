import { createAction, props } from "@ngrx/store";
import { imageModel, userModel } from "./user.model";

export const LOAD_USER_DATA = '[user page] load data'
const LOAD_USER_DATA_SUCCESS = '[user page] load data success' 
export const UPLOAD_PHOTO = '[user profile] upload photo'
const UPLOAD_PHOTO_SUCCESS = '[user profile] upload photo success'

export const loadUserData = createAction(LOAD_USER_DATA);
export const loadUserDataSuccess = createAction(LOAD_USER_DATA_SUCCESS, props<userModel>());

export const uploadPhoto = createAction(UPLOAD_PHOTO, props<{file: File}>());
export const uploadPhotoSuccess = createAction(UPLOAD_PHOTO_SUCCESS, props<imageModel>());