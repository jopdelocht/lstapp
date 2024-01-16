import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css'
})

export class IngredientComponent {
  url: string = 'http://127.0.0.1:8000/api/ingredients';

  ingredients: any[] = [];

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.ingredients = json
        // save ingredients as rowData
        this.rowData = this.ingredients
      })
  }

  ngOnInit() {
    this.fetchMyData();
  }
  // assign rowData for module
  rowData = this.ingredients;
  // Define table columns
  colDefs: ColDef[] = [
    { field: "id" },
    { field: "ingredienten", filter: true },
    { field: "allergenen", filter: true },
  ]
}