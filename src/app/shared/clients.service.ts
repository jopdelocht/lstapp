import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor() { }
  // put clients API endpoint URL in constant
  clientsURL: string = 'http://127.0.0.1:8000/api/clients';

  // get clients
  async getClients() {
    return (await fetch(this.clientsURL)).json();
  }
}
