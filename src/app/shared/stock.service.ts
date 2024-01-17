import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  url: any = 'http://127.0.0.1:8000/api/stockitems';

  getStockData() {
    return fetch(this.url)
      .then(res => res.json())
  }

  postStockItem() {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({
        'name': 'Vierkanttaart',
        'quantity': 10,
        'expirationdate': '2025-12-10',
        'isfood': 1,
        'supplier_id': 1,
        'ingredient_id': 1
      })
    };

    fetch('http://127.0.0.1:8000/api/stockitems', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }

}
