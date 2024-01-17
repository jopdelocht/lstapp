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
  // email!:     string;
  showPassword: boolean = false;
  constructor(private  userService:  UserService) { }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(){
    const token = await this.userService.login(this.username, this.password);
    if (token){
      localStorage.setItem('token', token)
      alert("Ingelogd")
      this.userService.goToHome();
    } else {
      alert("Foutieve inloggegevens")
    }
    this.username = '';
    this.password = '';
    // this.email ='';
  }


}
