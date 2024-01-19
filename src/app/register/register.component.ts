import { Component } from '@angular/core';
// modules
import { FormsModule } from '@angular/forms';
// services
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private userService: UserService, private toastr: ToastrService) {

  }

  ngOnInit(){
    this.userService.getUsers()    
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // console.log(this.username);
    // console.log(this.password);
    // console.log(this.email)

    // check if all fields are filled
    if (!this.username || !this.password || !this.email) {
      this.toastr.error('Vul alle velden in', 'Error');
    }else{
      // check if email is valid (containing @ and .)
      if (this.email.includes("@") === false || this.email.includes(".") === false) {
       this.toastr.error('Voer een geldig email-adres in', 'Error');
      }else{
        // call method to register from userservice
      this.userService.register(this.username, this.password, this.email);

      // clear the fields;
      this.username = '';
      this.password = '';
      this.email = '' ;
      }   
    }
  }
}