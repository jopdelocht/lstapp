import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
isLoggedIn: any;
  username: string | null | undefined;
  constructor( private toastr: ToastrService) {
  }

  redirectToHome(){
    location.replace('http://localhost:4200/home');
  }
  // Logout: delete token
  logout(){
    localStorage.removeItem('token');
    this.toastr.success('Uitgelogd', 'Succes');
    setTimeout((this.redirectToHome), 2000);
  }
  ngOnInit(){
   if (localStorage.getItem('token')){
     this.isLoggedIn = true;
   }
   if (localStorage.getItem('username')){
     this.username = localStorage.getItem('username');
   }
  }
}
