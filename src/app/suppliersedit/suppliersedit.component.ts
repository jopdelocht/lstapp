import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-suppliersedit',
  standalone: true,
  imports: [AgGridModule, CommonModule, RouterOutlet],
  templateUrl: './suppliersedit.component.html',
  styleUrl: './suppliersedit.component.css'
})
export class SupplierseditComponent {
  suppliersURL: string = 'http://127.0.0.1:8000/api/suppliers';
  suppliers: any[] = [];
  gridApi: any;
  columnApi: any;

  fetchMyData() {
    fetch(this.suppliersURL)
      .then(response => response.json())
      .then(json => {
        this.suppliers = json
        // save stockitems as rowData
        this.rowData = this.suppliers
      }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.fetchMyData();
  }

  // assign rowData for module
  rowData = this.suppliers;
  
  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "name",
      filter: true,
      headerName: 'Naam',
      minWidth: 280,
      sortIndex: 0,
      sort: 'asc',
      checkboxSelection: true
      
    }
  ]
}
