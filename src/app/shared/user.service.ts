import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private router: Router, private toastr: ToastrService) { }

  // Put Users API Endpoint URL in constant
  userURL: string = 'http://localhost:8000/api/users/';

  // User register method => Hashing on backend
  async register(username: any, password: any, email: any) {
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      // confirm user created
      this.toastr.success('Succesvol geregistreerd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
      // call method to go to login
      this.goToLogin();
      return result.json();
    } else {
      // error if user or email already exists
      this.toastr.error('Gebruikersnaam en/of email bestaat al', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
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
  async login(username: string, password: string) {
    let users = await this.getUsers();
    // check if user exists
    let user = users.find((u: { name: string; password: string }) => u.name === username);
    // check if password is correct
    if (user && bcrypt.compareSync(password, user.password)) {
      return user.remember_token.toString();
    }
    return null;
  }
  // go to login
  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
  // go to  home
  goToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
