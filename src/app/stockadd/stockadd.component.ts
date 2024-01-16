import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StockService } from '../shared/stock.service';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'app-stockadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule],
  templateUrl: './stockadd.component.html',
  styleUrl: './stockadd.component.css'
})
export class StockaddComponent {

  constructor(private stockService: StockService) { }

  stockItems: any[] = [];
  apiUrl = this.stockService.url;
  // assign rowData for module
  rowData = this.stockItems;

  getStockItems() {
    this.stockService.getStockData().then(data => {
      this.stockItems = data;
      this.rowData = this.stockItems
    }).catch(error => console.log(error));
  }
  postTest() {
    this.stockService.postStockItem();
    this.getStockItems();
  }
  ngOnInit() {
    this.getStockItems();
  }

  colDefs: ColDef[] = [
    {
      field: "id",
      filter: true,
      maxWidth: 90
    },
    {
      field: "name",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 300,
      sortIndex: 0,
      sort: 'asc'
    },
    {
      field: "quantity",
      filter: true,
      headerName: 'Hoeveelheid',
      maxWidth: 150
    },
    {
      field: "supplier",
      filter: true,
      headerName: 'Leverancier',
      maxWidth: 150,
      sortIndex: 1,
      sort: 'asc'
    },
    {
      field: "isfood",
      filter: true,
      headerName: 'Voeding'
    }
  ]
}
