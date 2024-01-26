import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }

  //Put recipe_product API endpoint URL in constant
  ordersURL: string = 'http://127.0.0.1:8000/api/orders';
  fullfillLineItemURL: string = 'http://127.0.0.1:8000/api/fullfill_line_item';

  // get recipe_product
  async getOrders() {
    return (await fetch(this.ordersURL)).json()
  }

  // Creation of async to removeLineItem from stock
  async removeLineItem(id: any) {
    console.log(id);
  }

  //creation of a async await method for the postOrder
  async postOrder(
    id: any,
    myQuantity: number,
    recipename: string,
    quantity: number,
    productName: string,
    measurement: string,
    ingredientNames: string,
    allergenNames: string) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({
        client_id: id,
        totalquantity: myQuantity,
        recipe: recipename,
        productquantity: quantity,
        product: productName,
        type: measurement,
        ingredient: ingredientNames,
        allergen: allergenNames
      })
    };
    const result = await fetch(this.ordersURL, options);
    return result.json();
  };

  fulfillLineItem(orderId: string) {
    
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({
        orderId: orderId
      })
    };

    fetch(this.fullfillLineItemURL, options);
  }

}
