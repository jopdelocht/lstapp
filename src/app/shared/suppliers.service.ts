import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }
  // put suppliers API Endpoint URL in constant
  suppliersURL: string = 'http://127.0.0.1:8000/api/suppliers'

  // get suppliers
  async getSuppliers() {
    return (await fetch(this.suppliersURL)).json()
  }

  async postSupplier(supplierName: string) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({ name: supplierName }),
    };
    const result = await fetch('http://127.0.0.1:8000/api/suppliers', options);
  }

}
