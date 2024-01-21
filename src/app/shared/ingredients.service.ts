import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }

  // Put ingredients API Endpoint URL in constant
  ingredientsURL: string = 'http://127.0.0.1:8000/api/ingredients';

  //get ingredients
  async getIngredients() {
    return (await fetch(this.ingredientsURL)).json();
  }

  //creation of a async await method for the postIngredient
}
