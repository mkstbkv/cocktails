import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { fetchCocktailRequest } from '../../store/cocktails/cocktails.actions';
import { Cocktail } from '../../models/cocktail.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.sass']
})
export class CocktailDetailsComponent implements OnInit, OnDestroy {
  cocktail: Observable<Cocktail | null>
  cocktailOne!: Cocktail;
  loading: Observable<boolean>
  error: Observable<null | string>
  cockSub!: Subscription;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.cocktail = store.select(state => state.cocktails.cocktail);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.error = store.select(state => state.cocktails.fetchError);
  }

  ngOnInit()  {
    this.store.dispatch(fetchCocktailRequest({id: this.route.snapshot.params['id']}));
    this.cockSub = this.cocktail.subscribe(cocktail => {
      if (cocktail) {
        this.cocktailOne = cocktail;
      }
    })
  }

  ngOnDestroy(): void {
    this.cockSub.unsubscribe()
  }
}
