import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData } from '../../models/cocktail.model';

export const fetchCocktailsRequest = createAction('[Cocktails] Fetch Request');
export const fetchCocktailsSuccess = createAction(
  '[Cocktails] Fetch Success',
  props<{cocktails: Cocktail[]}>()
);
export const fetchCocktailsFailure = createAction(
  '[Cocktails] Fetch Failure',
  props<{error: string}>()
);

export const fetchMyCocktailsRequest = createAction('[Cocktails] MyCocktails Fetch Request');
export const fetchMyCocktailsSuccess = createAction(
  '[Cocktails] MyCocktails Fetch Success',
  props<{cocktails: Cocktail[]}>()
);
export const fetchMyCocktailsFailure = createAction(
  '[Cocktails] MyCocktails Fetch Failure',
  props<{error: string}>()
);


export const fetchCocktailRequest = createAction(
  '[Cocktails] One Cocktail Fetch Request',
  props<{id: string}>()
);
export const fetchCocktailSuccess = createAction(
  '[Cocktails] One Cocktail Fetch Success',
  props<{cocktail: Cocktail}>()
);
export const fetchCocktailFailure = createAction(
  '[Cocktails] One Cocktail Fetch Failure',
  props<{error: string}>()
);


export const createCocktailRequest = createAction(
  '[Cocktails] Create Request',
  props<{cocktailData: CocktailData}>()
);
export const createCocktailSuccess = createAction(
  '[Cocktails] Create Success'
);
export const createCocktailFailure = createAction(
  '[Cocktails] Create Failure',
  props<{error: string}>()
);


export const publishCocktailsRequest = createAction(
  '[Cocktails] Publish Request',
  props<{id: string}>()
);
export const publishCocktailSuccess = createAction(
  '[Cocktails] Publish Success'
);
export const publishCocktailFailure = createAction(
  '[Cocktails] Publish Failure',
  props<{error: string}>()
);


export const deleteCocktailRequest = createAction(
  '[Cocktails] Delete Request',
  props<{id: string}>()
);
export const deleteCocktailSuccess = createAction(
  '[Cocktails] Delete Success'
);
export const deleteCocktailFailure = createAction(
  '[Cocktails] Delete Failure',
  props<{error: string}>()
);
