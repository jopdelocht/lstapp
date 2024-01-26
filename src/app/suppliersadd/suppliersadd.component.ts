import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../shared/suppliers.service';
// import toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-suppliersadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './suppliersadd.component.html',
  styleUrl: './suppliersadd.component.css'
})
export class SuppliersaddComponent {

  constructor(private suppliersService: SuppliersService, private toastr: ToastrService) { }

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
    if (!this.supplierName) {
      this.toastr.error('Vul leveranciernaam in', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 2000 });
    } else {
    await this.suppliersService.postSupplier(this.supplierName);
    this.fetchSuppliers();
    // Show success message
    this.toastr.success('Leverancier toegevoegd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 2000 });
    // refresh the page by redirecting to its own url
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
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