import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { SuppliersService } from '../shared/suppliers.service';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})

export class SuppliersComponent {

  constructor(private suppliersService: SuppliersService) { }

  suppliers: any[] = [];

  async fetchSuppliers() {
    this.suppliers = await this.suppliersService.getSuppliers();
    // save suppliers as rowData
    this.rowData = this.suppliers
  }


  ngOnInit() {
    this.fetchSuppliers();
  }
  // assign rowData for module
  rowData = this.suppliers;
  // Define table columns
  colDefs: ColDef[] = [
    { field: "name", filter: true },
  ]
}