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
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({
        product_id: stockName,
        quantity: stockQuantity,
        expirationdate: stockDate,
        supplier_id: stockSupplier
      })
    };
    const result = await fetch(this.stockitemsURL, options);
    return result.json();
  };

  //creation of a async await method for the deleteStockItem
  async deleteStockItems(id: any) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: 'false'
    };
    const result = await fetch('http://127.0.0.1:8000/api/stockitems/' + id, options);
   }
  //  creation of a async await method for the updateStockItem
   async updateStockItem(myId: any, myProduct: number, myQuantity: number, myDate: Date, mySupplier: number) {
    const item = {
      product_id: myProduct,
      quantity: myQuantity,
      expirationdate: myDate,
      supplier_id: mySupplier
    };
    const result = await fetch('http://127.0.0.1:8000/api/stockitems/'+myId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify(item)
    })
    return result.json();
  }
}

