import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  username: string | null | undefined;
isLoggedIn: boolean = false;
  ngOnInit() {
    if (localStorage.getItem('username')){
      this.username = localStorage.getItem('username');
    }
    if (localStorage.getItem('token')){
      this.isLoggedIn = true
    }
  }
}
