import { Component } from '@angular/core';
// Modules
import { FormsModule } from '@angular/forms';
// Services
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!:  string;
	password!:  string;
  constructor(private  userService:  UserService) { }

  async onSubmit(){
    const token = await this.userService.login(this.username, this.password);
    if (token){
      localStorage.setItem('token', token)
      console.log("Access granted")
    } else {
      console.log("Access denied")
    }
    this.username = '';
    this.password = '';
  }

  // Logout: delete token
  logout(){
    localStorage.removeItem('token');
    console.log("Logged out successfully")
  }
}
