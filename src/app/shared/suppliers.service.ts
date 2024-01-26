import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  constructor() { }
  // put suppliers API Endpoint URL in constant
  suppliersURL: string = 'http://127.0.0.1:8000/api/suppliers/';

  // get suppliers
  async getSuppliers() {
    return (await fetch(this.suppliersURL)).json();
  }

  async postSupplier(supplierName: string) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({ name: supplierName }),
    };
    const result = await fetch(this.suppliersURL, options);
  }

  async editSupplier(myId: any, mySupplier: any) {
    const item = {
      name: mySupplier
    };
    const result = await fetch(this.suppliersURL + myId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify(item)
    })
    return result.json();
  }

  async deleteSupplier(id: any) {
    const options = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: 'false'
    };
    const result = await fetch(this.suppliersURL + id, options);
   }
}
