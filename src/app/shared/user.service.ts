import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // Put Users API Endpoint URL in constant
  userURL:string='http://localhost:8000/api/users';

  // User register method => Hashing on backend
  async register(username: any, password: any){
    const user = {
      name: username,
      password: password
    };
    const result = await fetch(this.userURL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(user)
    });
    return result.json();
  }

  // get users
  async getUsers() {
    return (await fetch(this.userURL)).json()
  }

  // Login method to return token
  async login(username:string, password:string){
    let users = await this.getUsers();
    let user = users.find((u: {name:string; password: string}) => u.name ===username);
    if (user && password===user.password){
      return user.id.toString();
    }
    return null;
  }

  constructor() { }
}
