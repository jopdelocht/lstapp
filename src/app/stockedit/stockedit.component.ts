import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import for the custom grams to kilo pipe operator
import { GramsToKilosPipe } from '../grams-to-kilos.pipe';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { StockService } from '../shared/stock.service';
import { ColDef } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
// for edit
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../shared/products.service';
import { SuppliersService } from '../shared/suppliers.service';

@Component({
  selector: 'app-stockedit',
  standalone: true,
  imports: [GramsToKilosPipe, AgGridModule, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './stockedit.component.html',
  styleUrl: './stockedit.component.css'
})

export class StockeditComponent {
  constructor(
    private stockService: StockService,
    private toastr: ToastrService,
    private productsService: ProductsService,
    private suppliersService: SuppliersService
  ) { }

  stockItems: any[] = [];
  gridApi: any;
  columnApi: any;
  editMode: boolean = false;
  myProduct: any;
  products: any;
  myQuantity: any;
  myDate: any;
  mySupplier: any;
  suppliers: any;
  currentSupplierId: any;
  myId: any;

  async fetchStockItems() {
    this.stockItems = await this.stockService.getStockItems();
    // save stockitems as rowData
    this.rowData = this.stockItems
  }
  getProducts() {
    this.productsService.getProducts().then(data => {
      this.products = data;
      console.log(this.products);
    }).catch(error => console.log(error));
  }

  getSuppliers() {
    this.suppliersService.getSuppliers().then(data => {
      this.suppliers = data;
      console.log(this.suppliers);
    }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.fetchStockItems();
    this.getProducts();
    this.getSuppliers();
  }

  // assign rowData for module
  rowData = this.stockItems;
  // Define table columns

  colDefs: ColDef[] = [
    {
      field: "product",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 280,
      sortIndex: 0,
      sort: 'asc',
      checkboxSelection: true
    },
    {
      field: "quantity",
      filter: true,
      headerName: 'Hoeveelheid'
    },
    {
      field: "expirationdate",
      filter: true,
      headerName: 'Vervaldatum',
      sortIndex: 1,
      sort: 'asc'
    },
    {
      field: "supplier",
      filter: true,
      headerName: 'Leverancier'
    }
  ]
  //functions needed for selecting and printing row data
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  // get selected rows
  getSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }

  // DELETE selected rows
  deleteSelectedRows() {
    // get array of the selected rows
    this.getSelectedRows();
    if (this.gridApi.getSelectedRows().length == 0) {
      this.toastr.error('Geen producten geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
    // select id's of the selected rows
    let selectedRows = this.gridApi.getSelectedRows();
    // get id's of the selectedrows and push it into an array
    let idArray = selectedRows.map((x: { id: any; }) => x.id);
    // console.log(idArray);
    idArray.forEach((id: any) => {
      // console.log(id)
      // call the deleteStockItems method
      this.stockService.deleteStockItems(id);
    });
    // show toast message to the user that the item(s) have been deleted
    if (idArray.length > 1) {
      this.toastr.success('Producten verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
      this.toastr.success('Product verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
    // refresh the page by redirecting to its own url
    setTimeout(() => {
      window.location.reload()
    }, 2000); 
  }
  }
  editCurrentRow() {
    // save ID of the selected row
    this.myId = this.gridApi.getSelectedRows()[0].id;
    // get array of the selected rows
    this.getSelectedRows();
    // make sure only one row is selected
    if (this.gridApi.getSelectedRows().length > 1 || this.gridApi.getSelectedRows().length < 1) {
      this.toastr.error('Selecteer één item', 'Error', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    }
    else { this.editMode = true; }

  // input the current selected row's data into the input fields
    // get the selected rows
    let selectedRows = this.gridApi.getSelectedRows();
    // iterate through the products and set the right id
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productname === selectedRows[0].product) {
        this.myProduct = this.products[i].id;
      }
    }
    // set the quantity to the selectedRow
    this.myQuantity = selectedRows[0].quantity;
    // set the expiration date
    this.myDate = selectedRows[0].expirationdate;
    // iterate through the suppliers and set the right id
    for (let i = 0; i < this.suppliers.length; i++) {
      if (this.suppliers[i].name === selectedRows[0].supplier) {
        this.mySupplier = this.suppliers[i].id;
      }
    }
  }
  saveChanges() {
    // call the updateStockItem method
    this.stockService.updateStockItem(this.myId, this.myProduct, this.myQuantity, this.myDate, this.mySupplier);
    // Show toast message to the user that the item has been edited
    this.toastr.success('Product bewerkt', 'Success', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    // refresh the page by redirecting to its own url
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
}
