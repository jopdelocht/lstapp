import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { IngredientsService } from '../shared/ingredients.service';
import { ProductsService } from '../shared/products.service';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productsadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './productsadd.component.html',
  styleUrl: './productsadd.component.css'
})
export class ProductsaddComponent {

  constructor(private productsService: ProductsService, private ingredientsService: IngredientsService) { }

  gridApi: any;
  columnApi: any;
  ingredientsURL = this.ingredientsService.ingredientsURL;
  ingredientsArray: any[] = [];
  ingredientIDs: string = '';
  productName: string = '';


  fetchIngredients() {
    fetch(this.ingredientsURL)
      .then(response => response.json())
      .then(json => {
        this.ingredientsArray = json;
        // save products as rowData
        this.rowData = this.ingredientsArray;

      }).catch(error => console.log(error));

  }

  ngOnInit() {
    this.fetchIngredients();
  }

  // assign rowData for module
  rowData = this.ingredientsArray;
  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "name",
      filter: true,
      headerName: 'Ingrediënten',
      sort: 'asc',
      checkboxSelection: true
    }
  ]

  //functions needed for selecting and printing row data
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  postSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    let ingredientIDs = selectedRows.map((x: { id: any; }) => x.id);
    console.log(ingredientIDs);
    this.ingredientIDs = ingredientIDs.join(',');

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({
        "name": this.productName,
        "ingredients": this.ingredientIDs,
        "isfood": "1",
        "type_id": "1"
      })
    };

    fetch('http://127.0.0.1:8000/api/products', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}
