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
  password: any;
  username: any;
  showPassword: boolean = false;
  email: any;

  constructor(private userService: UserService) {

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log(this.username);
    console.log(this.password);

    // acces the service and send username and password
    this.userService.register(this.username, this.password);

    // clear the fields;
    this.username = '';
    this.password = '';
  }
}