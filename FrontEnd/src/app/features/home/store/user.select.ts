import { createFeatureSelector, createSelector } from "@ngrx/store";
import { userModel } from "./user.model";

const userState = createFeatureSelector<userModel>('user');

export const getUser = createSelector(userState,(state) => (state));

export const getUserName = createSelector(userState,(state) => (state.fullName));