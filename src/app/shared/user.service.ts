import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // Put Users API Endpoint URL in constant
  userURL:string='http://localhost:8000/api/users';

  // User register method => Hashing on backend
  async register(username: any, password: any, email:any){
    // call array of users from API
    let users = await this.getUsers();
    // check if user or email already exists and only run register if they don't
    if (!users.some((user: { name: any; }) => user.name === username) && !users.some((user: { email: any; }) => user.email === email)) {
  const user = {
    name: username,
    password: password,
    email: email
  };
  const result = await fetch(this.userURL, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(user)
  });
  console.log("User created Succesfully")
  return result.json();
  // return error if user already exists
}else{
  console.log("You need a unique username and password")
}
}

  // get users
  async getUsers() {
    const response = await fetch(this.userURL);
    const users = await response.json();
    // console.log(users)
    return users;
  }

  // Login method to return token
  async login(username:string, password:string){
    let users = await this.getUsers();
    let user = users.find((u: {name:string; password: string}) => u.name ===username);
    if (user && bcrypt.compareSync(password, user.password)){
      return user.remember_token.toString();
    }
    return null;
  }
}
