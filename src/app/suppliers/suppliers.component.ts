import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})

export class SuppliersComponent {
  url: string = 'http://127.0.0.1:8000/api/suppliers';

  suppliers: any[] = [];

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.suppliers = json
        // save suppliers as rowData
        this.rowData = this.suppliers
      })
  }

  ngOnInit() {
    this.fetchMyData();
  }
  // assign rowData for module
  rowData = this.suppliers;
  // Define table columns
  colDefs: ColDef[] = [
    { field: "name", filter: true },
  ]
}