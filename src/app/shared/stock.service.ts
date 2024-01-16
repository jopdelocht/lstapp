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

}
