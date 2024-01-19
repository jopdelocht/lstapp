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
  selector: 'app-stockedit',
  standalone: true,
  imports: [GramsToKilosPipe, AgGridModule, CommonModule, RouterOutlet],
  templateUrl: './stockedit.component.html',
  styleUrl: './stockedit.component.css'
})
export class StockeditComponent {
  stockitemsURL = this.stockService.stockitemsURL;
  stockItems: any[] = [];
  gridApi: any;
  columnApi: any;

  constructor(private stockService: StockService) { }

  fetchMyData() {
    fetch(this.stockitemsURL)
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
      field: "ingredient",
      filter: true,
      headerName: 'Ingrediënten'
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
  //functions needed for selecting and printing row data
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  //get selected rows
  getSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows);
  }

}
