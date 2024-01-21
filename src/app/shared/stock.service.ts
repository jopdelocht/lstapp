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
  async postStockItem(stockName: number, stockQuantity: number, stockDate: Date, stockSupplier: number) {
    const item = {
      product_id: stockName,
      quantity: stockQuantity,
      expirationdate: stockDate,
      supplier_id: stockSupplier
    };
    const result = await fetch(this.stockitemsURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify(item)
    })
    return result.json();
  };
}



