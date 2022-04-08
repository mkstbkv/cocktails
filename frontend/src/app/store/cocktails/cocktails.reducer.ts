import { createReducer, on } from '@ngrx/store';
import { CocktailsState } from '../types';
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess, deleteCocktailFailure, deleteCocktailRequest, deleteCocktailSuccess,
  fetchCocktailFailure,
  fetchCocktailRequest,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess, fetchCocktailSuccess, publishCocktailFailure, publishCocktailsRequest, publishCocktailSuccess
} from './cocktails.actions';

const initialState: CocktailsState = {
  cocktails: [],
  cocktail: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
  publishError: null,
  deleteLoading: false,
  deleteError: null,
};

export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailsSuccess, (state, {cocktails}) => ({
    ...state,
    fetchLoading: false,
    cocktails
  })),
  on(fetchCocktailsFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(fetchCocktailRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailSuccess, (state, {cocktail}) => ({
    ...state,
    fetchLoading: false,
    cocktail
  })),
  on(fetchCocktailFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createCocktailRequest, state => ({...state, createLoading: true})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),
  on(publishCocktailsRequest, state => ({...state, publishLoading: true})),
  on(publishCocktailSuccess, state => ({
    ...state,
    publishLoading: false,
  })),
  on(publishCocktailFailure, (state, {error}) => ({
    ...state,
    publishLoading: false,
    publishError: error,
  })),

  on(deleteCocktailRequest, state => ({...state, deleteLoading: true})),
  on(deleteCocktailSuccess, state => ({
    ...state,
    fetchLoading: false,
  })),
  on(deleteCocktailFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),
);
