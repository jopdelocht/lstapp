import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import for the custom grams to kilo pipe operator
import { GramsToKilosPipe } from '../grams-to-kilos.pipe';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { StockService } from '../shared/stock.service';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private stockService: StockService, private toastr: ToastrService) { }

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
  // DELETE selected rows
  deleteSelectedRows() {
    // get array of the selected rows
    this.getSelectedRows();
    // select id's of the selected rows
    let selectedRows = this.gridApi.getSelectedRows();
    // get id's of the selectedrows and push it into an array
    let idArray = selectedRows.map((x: { id: any; }) => x.id);
    // console.log(idArray);
    idArray.forEach((id: any) => {
      // console.log(id)
      // call the deleteStockItems method
      this.stockService.deleteStockItems(id);});
    // show toast message to the user that the item(s) have been deleted
    if (idArray.length > 1) {
      this.toastr.success('Producten verwijderd', 'Success', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    }else{this.toastr.success('Product verwijderd', 'Success', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
  }
    // refresh the page by redirecting to its own url
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
}
