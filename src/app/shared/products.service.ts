import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  // Put products API Endpoint URL in constant
  productsURL: string = 'http://127.0.0.1:8000/api/products';

  // get products
  async getProducts() {
    return (await fetch(this.productsURL)).json()
  }

  async postProduct(productName: string, ingredientIDs: string, isFood: number, typeId: number) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({
        name: productName,
        ingredients: ingredientIDs,
        isfood: isFood,
        type_id: typeId
      })
    };

    fetch('http://127.0.0.1:8000/api/products', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

  async editProduct(myId: any, myProduct: any, myIngredients: any, myIsFood: any, myType: any) {
    const item = {
      productname: myProduct,
      ingredient: myIngredients,
      type_id: myType,
      isFood: myIsFood
    }
    const result = await fetch(this.productsURL + myId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify(item)
    })
    return result.json();
  }
  async deleteProduct(id: any) {
    const result = await fetch(this.productsURL + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: 'false'
    })
  }
}
