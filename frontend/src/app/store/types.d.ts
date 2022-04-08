import { LoginError, User } from '../models/user.model';
import { Cocktail } from '../models/cocktail.model';

export type CocktailsState = {
  cocktails: Cocktail[],
  cocktail: Cocktail | null,
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  publishError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type UsersState = {
  user: null | User,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type AppState = {
  cocktails: CocktailsState,
  users: UsersState,
}


