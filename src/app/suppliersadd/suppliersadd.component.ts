  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  // import grid module
  import { AgGridModule } from 'ag-grid-angular';
  import { ColDef } from 'ag-grid-community';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-suppliersadd',
    standalone: true,
    imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
    templateUrl: './suppliersadd.component.html',
    styleUrl: './suppliersadd.component.css'
  })
  export class SuppliersaddComponent {
    url: string = 'http://127.0.0.1:8000/api/suppliers';

    suppliers: any[] = [];
    supplierName: string = '';

    postItem() {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: JSON.stringify({name: this.supplierName}),
    };
    
    fetch('http://127.0.0.1:8000/api/suppliers', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));    
    }
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