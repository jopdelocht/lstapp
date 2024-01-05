import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GramsToKilosPipe } from '../grams-to-kilos.pipe';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GramsToKilosPipe],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  url: string = 'http://localhost:3000/stock';

  stockitems: any[] = [];

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => this.stockitems = json)
  }

  ngOnInit() {
    this.fetchMyData();
  }
}
