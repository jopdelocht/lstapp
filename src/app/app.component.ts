import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
isLoggedIn: any;
  constructor(private router: Router) {
  }
  // Logout: delete token
  logout(){
    localStorage.removeItem('token');
    alert("Succesvol uitgelogd")
    // this.router.navigate(['/home']);
    location.replace('http://localhost:4200/home');
  }
  ngOnInit(){
   if (localStorage.getItem('token')){
     this.isLoggedIn = true;
   } 
  }
}
