import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }

  // Put ingredients API Endpoint URL in constant
  ingredientsURL: string = 'http://127.0.0.1:8000/api/ingredients/';
  allergensURL: string = 'http://127.0.0.1:8000/api/allergens/';

  //get ingredients
  async getIngredients() {
    return (await fetch(this.ingredientsURL)).json();
  }
  async getAllergens() {
    return (await fetch(this.allergensURL)).json();
  }
  async postIngredient(Ingredient: any, Allergens: any) {
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8', Authorization: 'Bearer '+token },
      body: JSON.stringify({ 'name': Ingredient, 'allergens': Allergens })
    };

    fetch('http://127.0.0.1:8000/api/ingredients', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
  async deleteIngredient(Ingredient_id: any) {
    const token = localStorage.getItem('token');
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8', Authorization: 'Bearer '+token },
      body: 'false'
    };
    const result = await fetch(this.ingredientsURL + Ingredient_id, options);
   }
   async editIngredient(myId: any, myIngredient: any, myAllergens: any) {
    const token = localStorage.getItem('token');
    const item = {
      name: myIngredient,
      allergens: myAllergens
    };
    const result = await fetch(this.ingredientsURL + myId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8', Authorization: 'Bearer '+token },
      body: JSON.stringify(item)
    });
  }
}