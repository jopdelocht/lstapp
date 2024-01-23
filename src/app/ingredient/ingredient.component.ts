import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { IngredientsService } from '../shared/ingredients.service';

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

  constructor(private ingredientsService: IngredientsService) { }

  async fetchMyData() {
    this.ingredients = await this.ingredientsService.getIngredients();
    // save ingredients as rowData
    this.rowData = this.ingredients
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