import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }

  // Put ingredients API Endpoint URL in constant
  ingredientsURL: string = 'http://127.0.0.1:8000/api/ingredients';
  allergensURL: string = 'http://127.0.0.1:8000/api/allergens';

  //get ingredients
  async getIngredients() {
    return (await fetch(this.ingredientsURL)).json();
  }
  async getAllergens() {
    return (await fetch(this.allergensURL)).json();
  }
  async deleteIngredient(Ingredient_id: any) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: 'false'
    };
    const result = await fetch('http://127.0.0.1:8000/api/ingredients/' + Ingredient_id, options);
   }
   async editIngredient(myId: any, myIngredient: any, myAllergen: any) {
    const item = {
      name: myIngredient,
      allergens: myAllergen
    };
    const result = await fetch(this.ingredientsURL + myId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify(item)
    });
  }
}