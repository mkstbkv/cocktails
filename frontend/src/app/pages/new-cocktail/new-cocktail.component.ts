import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CocktailData } from '../../models/cocktail.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { createCocktailRequest } from '../../store/cocktails/cocktails.actions';

@Component({
  selector: 'app-new-cocktail',
  templateUrl: './new-cocktail.component.html',
  styleUrls: ['./new-cocktail.component.sass']
})
export class NewCocktailComponent implements OnInit {
  cocktailForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.cocktailForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
      recipe: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });

    this.addIngredient();
  }

  getIngredientControls() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    return ingredients.controls;
  }

  addIngredient() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    const ingredientGroup = new FormGroup({
      title: new  FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
    ingredients.push(ingredientGroup);
  }

  deleteIngredient(index: number) {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.controls.splice(index, 1);
    ingredients.value.splice(index, 1);
  }

  resetIngredients() {
    const ingredients = <FormArray>this.cocktailForm.get('ingredients');
    ingredients.clear();
  }

  onSubmit() {
    const cocktailData: CocktailData = {
      name: this.cocktailForm.get('name')?.value,
      ingredients: JSON.stringify(this.cocktailForm.get('ingredients')?.value),
      recipe: this.cocktailForm.get('recipe')?.value,
      image: this.cocktailForm.get('image')?.value,
    }
    this.store.dispatch(createCocktailRequest({cocktailData}));
  }
}
