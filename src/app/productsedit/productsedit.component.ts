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
  productsURL: string = this.productsService.productsURL
  ingredientsURL: string = this.ingredientsService.ingredientsURL
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
  isFood: any;
typeId: any;
productName: any;


  ngOnInit() {
    this.getProducts();
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
      field: "productname",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 280,
      sortIndex: 0,
      sort: 'asc',
      checkboxSelection: true
    },
    {
      field: "ingredient",
      filter: true,
      headerName: 'Ingrediënten'
    },
    {
      field: "type",
      filter: true,
      headerName: 'Type'
    },
    {
      field: "isfood",
      filter: true,
      headerName: 'Voeding',
      cellRenderer: this.isFoodRenderer.bind(this),
      cellClass: 'center',
      maxWidth: 115
    }
  ]

  constructor(private productsService: ProductsService, private ingredientsService: IngredientsService, private toastr: ToastrService){}
  getProducts(){
    this.productsService.getProducts().then((data) => {
      this.products = data;
      this.rowData = this.products
    }).catch(error => console.log(error));
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
    let idArray = selectedRows.map((x: { id: any; }) => x.id);
    idArray.forEach((id: any) => {
      this.productsService.deleteProduct(id);
    })
    if (idArray.length > 1) {
      this.toastr.success('Producten verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
      this.toastr.success('Product verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
  }
  editCurrentRow(){
    this.myId = this.gridApi.getSelectedRows()[0].id;
    if (this.gridApi.getSelectedRows().length > 1 || this.gridApi.getSelectedRows().length < 1) {
      this.toastr.error('Selecteer slechts één product', 'Error', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    }
    else { this.editMode=true; }
    let selectedRows = this.gridApi.getSelectedRows();
    this.myProduct = selectedRows[0].name;
  }
  saveChanges(){
    this.productsService.editProduct(this.myId, this.myProduct, this.myIngredients, this.myIsFood, this.myType);
    this.toastr.success('Product bewerkt', 'Success', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

