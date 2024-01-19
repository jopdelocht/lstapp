import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockService } from '../shared/stock.service';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stockadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './stockadd.component.html',
  styleUrl: './stockadd.component.css'
})
export class StockaddComponent {

  constructor(private stockService: StockService) { }

  stockItems: any[] = [];
  apiUrl = this.stockService.stockitemsURL;
  // assign rowData for module
  rowData = this.stockItems;
  productName: string = '';
  productQuantity: number = 0;
  productDate: Date = new Date();
  productSupplier: number = 0;
  productIngredient: number = 0;
  productIsFood: number = 0;

  getStockItems() {
    this.stockService.getStockItems().then(data => {
      this.stockItems = data;
      this.rowData = this.stockItems
    }).catch(error => console.log(error));
  }

  // This function checks if the incoming data from isfood is 1 or 0 --> returns a specific icon
  isFoodRenderer(params: any) {
    if (params.value === 1) {
      return '<i class="fa-regular fa-circle-check"></i>';
    } else {
      return '<i class="fa-regular fa-circle-xmark"></i>';
    }
  }

  postItem() {
    console.log(this.productName);
    console.log(this.productQuantity);
    console.log(this.productDate);
    console.log(this.productSupplier);
    console.log(this.productIngredient);
    console.log(this.productIsFood);

    // Access the service and send a stockitem
    this.stockService.postStockItem(
      this.productName,
      this.productQuantity,
      this.productDate,
      this.productSupplier,
      this.productIngredient,
      this.productIsFood
    ).then(() => {
      // Clear the fields
      this.productName = '';
      this.productQuantity = 0;
      this.productDate = new Date();
      this.productSupplier = 0;
      this.productIngredient = 0;
      this.productIsFood = 0;

      // Refresh the grid
      this.getStockItems();
    });
  }

  ngOnInit() {
    this.getStockItems();
  }

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

//   {
//   field: "isfood",
//   filter: true,
//   headerName: 'Voeding',
//   cellRenderer: this.isFoodRenderer.bind(this),
//   cellClass: 'center',
// }