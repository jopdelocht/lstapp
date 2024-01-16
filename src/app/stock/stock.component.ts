import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import for the custom grams to kilo pipe operator
import { GramsToKilosPipe } from '../grams-to-kilos.pipe';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GramsToKilosPipe, AgGridModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  url: string = 'http://127.0.0.1:8000/api/stockitems';

  stockitems: any[] = [];

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.stockitems = json
        // save stockitems as rowData
        this.rowData = this.stockitems
      })
  }

  ngOnInit() {
    this.fetchMyData();
  }
  // assign rowData for module
  rowData = this.stockitems;
  // Define table columns
  colDefs: ColDef[] = [
    {
      field: "id",
      hide: true
    },
    {
      field: "name",
      filter: true,
      headerName: 'Beschrijving',
      minWidth: 280
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
      headerName: 'Leverancier'
    },
    {
      field: "isfood",
      filter: true,
      headerName: 'Voeding'
    }
  ]
}
