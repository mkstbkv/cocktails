import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cocktail, CocktailData } from '../models/cocktail.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  constructor(private http: HttpClient) { }

  getCocktails() {
    return this.http.get<Cocktail[]>(environment.apiUrl + '/cocktails').pipe(
      map(response => {
        return response.map(cocktailData => {
          return new Cocktail(
            cocktailData._id,
            cocktailData.user,
            cocktailData.name,
            cocktailData.image,
            cocktailData.recipe,
            cocktailData.is_published,
            cocktailData.ingredients
          );
        });
      })
    );
  }

  getCocktail(id: string) {
    return this.http.get<Cocktail>(environment.apiUrl + '/cocktails/myCocktails' + id).pipe(
      map(response => {
        return new Cocktail(
          response._id,
          response.user,
          response.name,
          response.image,
          response.recipe,
          response.is_published,
          response.ingredients
        );
      })
    );
  }

  createCocktail(cocktailData: CocktailData) {
    const formData = new FormData();

    Object.keys(cocktailData).forEach(key => {
      if (cocktailData[key] !== null) {
        formData.append(key, cocktailData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/cocktails', formData);
  }

  deleteCocktail(id: string) {
    return this.http.delete(environment.apiUrl + '/cocktails/' + id)
  }

  publishCocktail(id: string) {
    return this.http.post(environment.apiUrl + '/cocktails/' + id + '/publish',
      {is_published: true})
  }
}
