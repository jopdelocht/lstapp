import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';


@Component({
  selector: 'app-ingredientadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './ingredientadd.component.html',
  styleUrl: './ingredientadd.component.css'
})
export class IngredientaddComponent {
  allergensURL: string = 'http://127.0.0.1:8000/api/allergens';
  ingredientsURL: string = 'http://127.0.0.1:8000/api/ingredients';
  allergens: any[] = [];
  allergenIDs: string = '';
  ingredientName: string = '';
  gridApi: any;
  columnApi: any;
  constructor() { }
  fetchMyData() {
    fetch(this.allergensURL)
      .then(response => response.json())
      .then(json => {
        this.allergens = json;
        // save stockitems as rowData
        this.rowData = this.allergens
      }).catch(error => console.log(error));
  }
  ngOnInit() {
    this.fetchMyData();
  }
  // assign rowData for module
  rowData = this.allergens;
  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "name",
      filter: true,
      headerName: 'Allergenen',
      sort: 'asc',
      checkboxSelection: true
    }
  ]

  //functions needed for selecting and printing row data
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
  //post selected rows
  postSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    let allergenIDs = selectedRows.map((x: { id: any; }) => x.id);
    console.log(allergenIDs);
    this.allergenIDs = allergenIDs.join(',');

    // this.postIngredient(this.ingredientName, this.allergenIDs);
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
      body: JSON.stringify({ 'name': this.ingredientName, 'allergens': this.allergenIDs })
    };

    fetch('http://127.0.0.1:8000/api/ingredients', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }
}
// async postIngredient(ingredientName: string, allergenIDs: string) {
//   const item = {
//     name: ingredientName,
//     allergens: allergenIDs.toString()
//   };
//   const result = await fetch(this.ingredientsURL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8' },
//     body: JSON.stringify(item)
//   })
//   return result.json();
// };
