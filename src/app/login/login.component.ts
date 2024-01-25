import { Component } from '@angular/core';
// Modules
import { FormsModule } from '@angular/forms';
// Services
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private  userService:  UserService, private toastr: ToastrService) { }
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(){
    const token = await this.userService.login(this.username, this.password);
    if (token){
      localStorage.setItem('token', token)
      localStorage.setItem('username', this.username);
      this.toastr.success('Ingelogd', 'Succes');
      setTimeout((this.redirectToHome), 2000);
    } else {
      this.toastr.error('Foutieve inloggegevens', 'Error');
    }
    this.username = '';
    this.password = '';
    // this.email ='';
  }
  redirectToHome(){
    location.replace('http://localhost:4200/home');
  }

}
