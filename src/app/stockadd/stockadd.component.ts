import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stockadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './stockadd.component.html',
  styleUrl: './stockadd.component.css'
})
export class StockaddComponent {

}
