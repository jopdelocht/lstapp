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
  ingredientsUrl: string = 'http://127.0.0.1:8000/api/ingredients';

  ingredients: [{}] = [{}];

  rowData = this.ingredients;

  colDefs: ColDef[] = [
    { field: "Ingredient", filter: true, headerName:"Ingredient" },
    { field: "Allergen", filter: true, headerName:"Allergenen" },
  ]

  fetchMyData() {
    fetch(this.ingredientsUrl)
    .then(response => response.json())
    .then(json => {
      this.rowData = json;
    })
    .catch(error => console.error(error))
  }

  ngOnInit() {
    this.fetchMyData();
  }
}