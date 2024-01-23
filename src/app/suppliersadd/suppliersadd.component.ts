import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../shared/suppliers.service';

@Component({
  selector: 'app-suppliersadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './suppliersadd.component.html',
  styleUrl: './suppliersadd.component.css'
})
export class SuppliersaddComponent {

  constructor(private suppliersService: SuppliersService) { }

  url: string = 'http://127.0.0.1:8000/api/suppliers';

  suppliers: any[] = [];
  supplierName: string = '';

  async fetchSuppliers() {
    this.suppliers = await this.suppliersService.getSuppliers();
    // save suppliers as rowData
    this.rowData = this.suppliers;
    // Clear the input field
    this.supplierName = '';
  }

  async postSupplier() {
    await this.suppliersService.postSupplier(this.supplierName);
    this.fetchSuppliers();
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