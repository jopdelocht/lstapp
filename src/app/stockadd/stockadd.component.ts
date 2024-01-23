import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
// import for ngModel
import { FormsModule } from '@angular/forms';
// import services
import { ProductsService } from '../shared/products.service';
import { SuppliersService } from '../shared/suppliers.service';
import { StockService } from '../shared/stock.service';
// import toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stockadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './stockadd.component.html',
  styleUrl: './stockadd.component.css'
})
export class StockaddComponent {

  constructor(private stockService: StockService, private productsService: ProductsService, private suppliersService: SuppliersService, private toastr: ToastrService) { }

  //product selected in form ngModel
  myProduct: any;
  //array for products
  products: any[] = [];
  product: any;
  // supplier selected in form ngModel
  mySupplier: any;
  //array for suppliers
  suppliers: any[] = [];
  supplier: any;
  //empty array for stockitems
  stockItems: any[] = [];
  stockitem: any;
  //api stockitems-url
  apiUrl = this.stockService.stockitemsURL;
  // assign rowData for module
  rowData = this.stockItems;
  // declare attributes for sending POST-data
  myQuantity: number = 0;
  myDate: Date = new Date();



  async fetchProducts() {
    this.products = await this.productsService.getProducts();
  }


  async fetchSuppliers() {
    this.suppliers = await this.suppliersService.getSuppliers();
  }


  async fetchStockItems() {
    this.stockItems = await this.stockService.getStockItems();
    this.rowData = this.stockItems
  }


  // This function checks if the incoming data from isfood is 1 or 0 --> returns a specific icon
  isFoodRenderer(params: any) {
    if (params.value === 1) {
      return '<i class="fa-regular fa-circle-check"></i>';
    } else {
      return '<i class="fa-regular fa-circle-xmark"></i>';
    }
  }

  async postStockItem() {
    // Access the service and send a stockitem
    await this.stockService.postStockItem(
      this.myProduct,
      this.myQuantity,
      this.myDate,
      this.mySupplier)
    // Clear the fields
    this.myProduct = '';
    this.myQuantity = 0;
    this.myDate = new Date();
    this.mySupplier = '';
    //refresh grid
    this.fetchStockItems();
    //show success message
    this.toastr.success('Stockitem toegevoegd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 2000 });
    // refresh the page by redirecting to its own url
    setTimeout(() => {
      window.location.reload()
    }, 2000);

  };


  //data loaded when page is initialized
  ngOnInit() {
    this.fetchProducts();
    this.fetchSuppliers();
    this.fetchStockItems();
  }

  //data showing in the overview grid
  colDefs: ColDef[] = [
    {
      field: "product",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 280,
      sortIndex: 0,
      sort: 'asc'
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
    },
    {
      field: "isfood",
      filter: true,
      headerName: 'Voeding'
    }
  ]
}