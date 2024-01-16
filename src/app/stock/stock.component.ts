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
  apiUrl = this.stockService.url;
  stockItems: any[] = [];

  constructor(private stockService: StockService) { }

  fetchMyData() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(json => {
        this.stockItems = json
        // save stockitems as rowData
        this.rowData = this.stockItems
      }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.fetchMyData();
  }
  // assign rowData for module
  rowData = this.stockItems;
  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "id",
      filter: true,
      maxWidth: 75
    },
    {
      field: "name",
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
      field: "ingredient",
      filter: true,
      headerName: 'Ingrediënten'
    },
    {
      field: "expirationdate",
      filter: true,
      headerName: 'Vervaldatum'
    },
    {
      field: "supplier",
      filter: true,
      headerName: 'Leverancier',
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
