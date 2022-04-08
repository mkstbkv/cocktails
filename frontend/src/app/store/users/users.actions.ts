import { createAction, props } from '@ngrx/store';
import { FacebookUserData, LoginError, LoginUserData, User } from '../../models/user.model';

export const loginUserRequest = createAction(
  '[Users] Login Request',
  props<{userData: LoginUserData}>()
);
export const loginUserSuccess = createAction(
  '[Users] Login Success',
  props<{user: User}>()
);
export const loginUserFailure = createAction(
  '[Users] Login Failure',
  props<{error: null | LoginError}>()
);

export const loginUserWithFacebookRequest = createAction(
  '[Users] Login With FB Request',
  props<{userData: FacebookUserData}>()
);

export const logoutUser = createAction('[Users] Logout');
export const logoutUserRequest = createAction('[Users] Server Logout Request');
