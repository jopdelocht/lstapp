import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { IngredientsService } from '../shared/ingredients.service';
import { ProductsService } from '../shared/products.service';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
// import toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productsadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './productsadd.component.html',
  styleUrl: './productsadd.component.css'
})
export class ProductsaddComponent {

  constructor(private productsService: ProductsService, private ingredientsService: IngredientsService, private toastr: ToastrService) { }

  gridApi: any;
  columnApi: any;
  ingredientsURL = this.ingredientsService.ingredientsURL;
  ingredientsArray: any[] = [];
  ingredientIDs: string = '';
  productName: string = '';
  isFood: number = 0;
  typeId: number = 1;


  async fetchIngredients() {
    this.ingredientsArray = await this.ingredientsService.getIngredients();
    // save products as rowData
    this.rowData = this.ingredientsArray;
  }

  ngOnInit() {
    this.fetchIngredients();
  }

  // assign rowData for module
  rowData = this.ingredientsArray;

  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "Ingredient",
      filter: true,
      headerName: 'Ingrediënten',
      sort: 'asc',
      checkboxSelection: true
    },
    {
      field: "Allergen",
      filter: true,
      headerName: 'Allergenen',
    }
  ]

  //functions needed for selecting and printing row data
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  postNewProduct() {
    // don't post if name and radiobuttons aren't selected
    if (!this.productName || !this.isFood || !this.typeId) {
      this.toastr.error('Vul alle velden in', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 2000 });
    }else{
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
    let ingredientIDs = selectedRows.map((x: { Ingredient_id: any; }) => x.Ingredient_id);
    console.log(ingredientIDs);
    this.ingredientIDs = ingredientIDs.join(',');
    // call method from service
    this.productsService.postProduct(this.productName, this.ingredientIDs, this.isFood, this.typeId);
    // clear the input fields
    this.productName = ""
    this.gridApi.deselectAll();
    this.isFood = 0;
    this.typeId = 1;

    // show success message
    this.toastr.success('Product toegevoegd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 2000 });
    // refresh the page by redirecting to its own url
    setTimeout(() => {
      window.location.reload()
    }, 2000);
    }
  }
}