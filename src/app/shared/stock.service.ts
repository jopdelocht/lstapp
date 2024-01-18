import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',

})
export class StockService {

  constructor() { }
  // Put stockitems API Endpoint URL in constant
  stockitemsURL: string = 'http://127.0.0.1:8000/api/stockitems';

  // get stockitems
  async getStockItems() {
    return (await fetch(this.stockitemsURL)).json()
  }


  //creation of a async await method for the postStockItem
  async postStockItem(productName: string, productQuantity: number, productDate: Date, productSupplier: number, productIngredient: number, productIsFood: number) {
    const item = {
      name: productName,
      quantity: productQuantity,
      expirationdate: productDate,
      supplier_id: productSupplier,
      ingredient_id: productIngredient,
      isfood: productIsFood
    };
    const result = await fetch(this.stockitemsURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify(item)
    })
    return result.json();
  };
}

