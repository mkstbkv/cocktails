import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchMyCocktailsRequest } from '../../store/cocktails/cocktails.actions';

@Component({
  selector: 'app-my-cocktails',
  templateUrl: './my-cocktails.component.html',
  styleUrls: ['./my-cocktails.component.sass']
})
export class MyCocktailsComponent implements OnInit {
  cocktails: Observable<Cocktail[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit() {
    this.store.dispatch(fetchMyCocktailsRequest());
  }
}
