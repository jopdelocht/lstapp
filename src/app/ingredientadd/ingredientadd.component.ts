import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { IngredientsService } from '../shared/ingredients.service';


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
  constructor(private toastr: ToastrService, private ingredientsService: IngredientsService) { }
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
    if (!this.ingredientName) {
      this.toastr.error('Vul ingredientnaam in', 'Fout');
    } else {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    let allergenIDs = selectedRows.map((x: { id: any; }) => x.id);
    console.log(allergenIDs);
    this.allergenIDs = allergenIDs.join(',');

    this.ingredientsService.postIngredient(this.ingredientName, this.allergenIDs);

      // Clear all the input fields
      this.ingredientName = '';
      this.allergenIDs = '';
      // show success message
      this.toastr.success('Ingredient toegevoegd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 2000 });
      // reload page
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
}