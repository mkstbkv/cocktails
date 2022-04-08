import { User } from './user.model';

export interface Ingredient {
  title: string;
  amount: string;
}
export class Cocktail {
  constructor(
    public _id: string,
    public user: User,
    public name: string,
    public image: string,
    public recipe: string,
    public is_published: Boolean,
    public ingredients: Ingredient[],
  ) {}
}

export interface CocktailData {
  [key: string]: any;
  name: string;
  image: File | null;
  recipe: string;
  ingredients: string
}
