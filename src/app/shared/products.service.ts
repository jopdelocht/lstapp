import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  // Put products API Endpoint URL in constant
  productsURL: string = 'http://127.0.0.1:8000/api/products/';

  // get products
  async getProducts() {
    const options = {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'User-Agent': 'insomnia/2023.5.8',
       },
    };
    return fetch(this.productsURL, options)
       .then(response => response.json())
       .catch(err => console.error(err));
   }

  async postProduct(productName: string, ingredientIDs: string, isFood: number, typeId: number) {
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8', Authorization: 'Bearer '+token },
      body: JSON.stringify({
        name: productName,
        ingredients: ingredientIDs,
        isfood: isFood,
        type_id: typeId
      })
    };

    fetch(this.productsURL, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  async editProduct(myId: any, myProduct: any, myIngredients: any, myIsFood: any, myType: any) {
    const token = localStorage.getItem('token');
    const item = {
      name: myProduct,
      ingredients: myIngredients,
      type_id: myType,
      isFood: myIsFood
    }
    const result = await fetch(this.productsURL + myId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8', Authorization: 'Bearer '+token },
      body: JSON.stringify(item)
    })
    return result.json();
  }
  async deleteProduct(Product_id: any) {
    const token = localStorage.getItem('token');
    const result = await fetch(this.productsURL + Product_id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8', Authorization: 'Bearer '+token },
      body: 'false'
    })
  }
}
