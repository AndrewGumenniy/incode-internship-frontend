import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';

import { LoginService } from '../../services/login.service';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED, GET_USER_SUCCESS, GET_USER_FAILED } from '../actions/login.actions';
import { LogInAction, LogInSuccess } from '../actions/login.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions: Actions,
    private service: LoginService,
  ) {}
  @Effect()
  logInEffect: Observable<any> = this.actions.pipe(
    ofType(LOGIN),
    mergeMap((action: LogInAction) => this.service.logIn(action.payload).pipe(
      map((data: any) => {
        localStorage.setItem('token', data.token);
        return { type: LOGIN_SUCCESS, payload: localStorage.getItem('token') };
      }),
      catchError((error: any) => of({ type: LOGIN_FAILED, payload: error } ))
    ))
  );
  @Effect()
  loginSuccessEffect: Observable<any> = this.actions.pipe(
    ofType(LOGIN_SUCCESS),
    switchMap((action: LogInSuccess) => {
      return this.service.getUserByToken(action.payload).pipe(
        map((user: any) => ({ type: GET_USER_SUCCESS, payload: user })),
        catchError((error: any) => of({type: GET_USER_FAILED, payload: error}))
      );
    })
  );
}
