import { Component } from '@angular/core';
// modules
import { FormsModule } from '@angular/forms';
// services
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password!: string;
  username!: string;
  showPassword: boolean = false;
  email!: string;

  constructor(private userService: UserService) {

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log(this.username);
    console.log(this.password);
    console.log(this.email)

    // acces the service and send username and password
    this.userService.register(this.username, this.password, this.email);

    // clear the fields;
    this.username = '';
    this.password = '';
    this.email = '' ;
  }
}