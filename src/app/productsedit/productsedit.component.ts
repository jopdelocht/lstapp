import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
// grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
// import services
import { ProductsService } from '../shared/products.service';
import { IngredientsService } from '../shared/ingredients.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-productsedit',
  standalone: true,
  imports: [AgGridModule, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './productsedit.component.html',
  styleUrl: './productsedit.component.css'
})

export class ProductseditComponent {
  selectedRows: any;
  ingredientIDs: any;
  constructor(private productsService: ProductsService, private ingredientsService: IngredientsService, private toastr: ToastrService){}
  
  allergens: any;
  productsURL: string = this.productsService.productsURL
  ingredientsURL: string = this.ingredientsService.ingredientsURL
  allergensURL: string = this.ingredientsService.allergensURL
  products: any[] = []
  gridApi: any;
  columnApi: any;
  editMode: boolean = false;
  myId: any;
  myProduct: any;
  myIngredients: any;
  myIsFood: any;
  myType: any;
  rowData: any[] | undefined;
  rowDataEdit: any[] | undefined;
  isFood: any;
  typeId: any;
  productName: any;
  ingredients: any;


  ngOnInit() {
    this.getProducts();
    this.getIngredients();
    this.getAllergens();
  }
  
  isFoodRenderer(params: any) {
    if (params.value === 1) {
      return '<i class="fa-regular fa-circle-check"></i>';
    } else {
      return '<i class="fa-regular fa-circle-xmark"></i>';
    }
  }

  colDefs: ColDef[] = [
    {
      field: "Product",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 280,
      sortIndex: 0,
      sort: 'asc',
      checkboxSelection: true
    },
    {
      field: "Ingredient",
      filter: true,
      headerName: 'Ingrediënten'
    },
    {
      field: "Type",
      filter: true,
      headerName: 'Type',
      maxWidth: 78
    },
    {
      field: "Isfood",
      filter: true,
      headerName: 'Voeding',
      cellRenderer: this.isFoodRenderer.bind(this),
      cellClass: 'center',
      maxWidth: 101
    }
  ]

  colDefEdit: ColDef[] = [
    {
      field: "Ingredient",
      filter: true,
      headerName: 'Ingrediënt',
      minWidth: 200,
      sortIndex: 0,
      checkboxSelection: true
    },
    {
      field: "Allergen",
      filter: true,
      headerName: 'Allergenen',
      minWidth: 200
    }
  ] 

  getProducts(){
    this.productsService.getProducts().then((data) => {
      this.products = data;
      this.rowData = this.products
      console.log(this.products)
    }).catch(error => console.log(error));
  }
  getIngredients(){
    this.ingredientsService.getIngredients().then((data) => {
      this.ingredients = data;
      this.rowDataEdit = this.ingredients
    })
  }
  getAllergens(){
    this.ingredientsService.getAllergens().then((data) => {
      this.allergens = data
      console.log(this.allergens)
    })
  }

  onGridReady(params:any){
    this.gridApi = params.api;
    this.columnApi = params.columnApi
  }

  getSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows)
  }

  deleteSelectedRows(){
    // get array of the selected rows
    this.getSelectedRows();
    if (this.gridApi.getSelectedRows().length == 0) {
      this.toastr.error('Geen producten geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
    let selectedRows = this.gridApi.getSelectedRows();
    let idArray = selectedRows.map((x: { Product_id: any; }) => x.Product_id);
    idArray.forEach((Product_id: any) => {
      this.productsService.deleteProduct(Product_id);
    })
    if (idArray.length > 1) {
      this.toastr.success('Producten verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
      this.toastr.success('Product verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  editCurrentRow(){
    console.log(this.gridApi.getSelectedRows());
    this.myId = this.gridApi.getSelectedRows()[0].Product_id;
    if (this.gridApi.getSelectedRows().length > 1 || this.gridApi.getSelectedRows().length < 1) {
      this.toastr.error('Selecteer slechts één product', 'Error', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    }
    else { 
      this.editMode=true;
      this.productName = this.gridApi.getSelectedRows()[0].Product;
      this.isFood = this.gridApi.getSelectedRows()[0].Isfood;
      this.typeId = this.gridApi.getSelectedRows()[0].Type_id;
    }
  }

  saveChanges(){
    if (!this.productName || !this.isFood || !this.typeId) {
     this.toastr.error('Vul alle velden in', 'Error', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000}); 
    } else {
      this.selectedRows = this.gridApi.getSelectedRows();
      this.myProduct = this.productName;
      this.ingredientIDs = this.selectedRows.map((x: { Ingredient_id: any; }) => x.Ingredient_id).join(',');
      this.myIngredients = this.ingredientIDs;
      this.myIsFood = this.isFood;
      this.myType = this.typeId;
      console.log(this.myId, this.myProduct, this.myIngredients, this.myIsFood, this.myType);
      this.productsService.editProduct(this.myId, this.myProduct, this.myIngredients, this.myIsFood, this.myType);
      this.toastr.success('Product bewerkt', 'Success', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
}

