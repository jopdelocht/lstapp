import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import for the custom grams to kilo pipe operator
import { GramsToKilosPipe } from '../grams-to-kilos.pipe';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ProductsService } from '../shared/products.service';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GramsToKilosPipe, AgGridModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private productsService: ProductsService) { }

  productsURL = this.productsService.productsURL;
  productArray: any[] = [];

  async fetchProducts() {
    this.productArray = await this.productsService.getProducts();
    // save products as rowData
    this.rowData = this.productArray
  }

  ngOnInit() {
    this.fetchProducts();
  }

  // This function checks if the incoming data from isfood is 1 or 0 --> returns a specific icon
  isFoodRenderer(params: any) {
    if (params.value === 1) {
      return '<i class="fa-regular fa-circle-check"></i>';
    } else {
      return '<i class="fa-regular fa-circle-xmark"></i>';
    }
  }

  // assign rowData for module
  rowData = this.productArray;
  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "productname",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 280,
      sortIndex: 0,
      sort: 'asc'
    },
    {
      field: "ingredient",
      filter: true,
      headerName: 'Ingrediënten'
    },
    // {
    //   field: "allergen",
    //   filter: true,
    //   headerName: 'Allergenen'
    // },
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
}
