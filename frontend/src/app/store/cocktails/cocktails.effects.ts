import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess,
  deleteCocktailFailure,
  deleteCocktailRequest,
  deleteCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchCocktailSuccess,
  publishCocktailFailure,
  publishCocktailsRequest,
  publishCocktailSuccess
} from './cocktails.actions';
import { CocktailsService } from '../../services/cocktails.service';
import { HelpersService } from '../../services/helpers.service';

@Injectable()
export class CocktailsEffects {
  fetchCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailsRequest),
    mergeMap(() => this.cocktailsService.getCocktails().pipe(
      map(cocktails => fetchCocktailsSuccess({cocktails})),
      catchError(() => of(fetchCocktailsFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  fetchCocktail = createEffect(() => this.actions.pipe(
    ofType(fetchCocktailRequest),
    mergeMap(({id}) => this.cocktailsService.getCocktail(id).pipe(
      map(cocktail => fetchCocktailSuccess({cocktail})),
      catchError(() => of(fetchCocktailFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createCocktail = createEffect(() => this.actions.pipe(
    ofType(createCocktailRequest),
    mergeMap(({cocktailData}) => this.cocktailsService.createCocktail(cocktailData).pipe(
      map(() => createCocktailSuccess()),
      tap(() => {
        void this.router.navigate(['/']);
        this.helpers.openSnackbar('Your cocktail is being reviewed by a moderator');
      }),
      catchError(() => of(createCocktailFailure({error: 'Wrong data'})))
    ))
  ));

  publishCocktail = createEffect(() => this.actions.pipe(
    ofType(publishCocktailsRequest),
    mergeMap( ({id}) => this.cocktailsService.publishCocktail(id).pipe(
      map(() => publishCocktailSuccess()),
      tap(() => {
        this.store.dispatch(fetchCocktailsRequest());
        this.helpers.openSnackbar('Published');
      }),
      catchError(() => of(publishCocktailFailure({error: 'No access!'})))
    ))
  ));

  deleteCocktail = createEffect(() => this.actions.pipe(
    ofType(deleteCocktailRequest),
    mergeMap(({id}) => this.cocktailsService.deleteCocktail(id).pipe(
      map(() => deleteCocktailSuccess()),
      tap(() => {
        this.store.dispatch(fetchCocktailsRequest());
        this.helpers.openSnackbar('Deleted');
      }),
      catchError(() => of(deleteCocktailFailure({error: 'No access!'})))
    ))
  ));

  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private cocktailsService: CocktailsService,
    private router: Router,
    private helpers: HelpersService,
  ) {}
}
