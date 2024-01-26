import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeProductService {

  constructor() { }

  //Put recipe_product API endpoint URL in constant
  recipeproductURL: string = 'http://127.0.0.1:8000/api/recipe_product_all';

  // get recipe_product
  async getRecipeProduct() {
    return (await fetch(this.recipeproductURL)).json()
  }

}
