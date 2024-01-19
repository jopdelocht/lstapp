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
}
