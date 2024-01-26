import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import for the custom grams to kilo pipe operator
import { GramsToKilosPipe } from '../grams-to-kilos.pipe';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { StockService } from '../shared/stock.service';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GramsToKilosPipe, AgGridModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

  constructor(private stockService: StockService) { }

  stockitemsURL = this.stockService.stockitemsURL;
  stockItems: any[] = [];

  async fetchStock() {
    this.stockItems = await this.stockService.getStockItems();
    // save stockitems as rowData
    this.rowData = this.stockItems
    console.log(this.stockItems)
  }

  ngOnInit() {
    this.fetchStock();
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
    }
  ]
}
