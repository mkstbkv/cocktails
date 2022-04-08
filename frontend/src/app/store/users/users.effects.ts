import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { loginUserFailure, loginUserRequest, loginUserSuccess, logoutUser, logoutUserRequest, } from './users.actions';
import { map, mergeMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { SocialAuthService } from 'angularx-social-login';
import { UsersService } from '../../services/users.service';
import { HelpersService } from '../../services/helpers.service';
import { AppState } from '../types';

@Injectable()
export class UsersEffects {
  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {}


  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ))

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(async () => {
          await this.auth.signOut();
          await this.router.navigate(['/']);
          this.helpers.openSnackbar('Logout successful');
        })
      );
    }))
  )
}
