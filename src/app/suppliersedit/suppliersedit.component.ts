import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ColumnState, GridReadyEvent } from 'ag-grid-community';
import { SuppliersService } from '../shared/suppliers.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suppliersedit',
  standalone: true,
  imports: [AgGridModule, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './suppliersedit.component.html',
  styleUrl: './suppliersedit.component.css'
})
export class SupplierseditComponent {
  suppliersURL: string = this.suppliersService.suppliersURL
  suppliers: any[] = [];
  gridApi: any;
  columnApi: any;
  editMode: boolean = false;
  myId: any;
  mySupplier: any;

  constructor(private suppliersService: SuppliersService, private toastr: ToastrService) { }

  getSuppliers() {
    this.suppliersService.getSuppliers()
      .then(data => {
        this.suppliers = data
        // save stockitems as rowData
        this.rowData = this.suppliers
      }).catch(error => console.log(error));
  }

  ngOnInit() {
    this.getSuppliers();
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
  onGridReady(params:any){
    this.gridApi = params.api;
    this.columnApi = params.columnApi
  }

  getSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows)
  }

  deleteSelectedRows(){
    // get array of the selected rows
    this.getSelectedRows();
    if (this.gridApi.getSelectedRows().length == 0) {
      this.toastr.error('Geen leveranciers geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
    let selectedRows = this.gridApi.getSelectedRows();
    let idArray = selectedRows.map((x: { id: any; }) => x.id);
    idArray.forEach((id: any) => {
      this.suppliersService.deleteSupplier(id);
    })
    if (idArray.length > 1) {
      this.toastr.success('Leveranciers verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
      this.toastr.success('Leverancier verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
  }
  editCurrentRow(){
    this.myId = this.gridApi.getSelectedRows()[0].id;
    if (this.gridApi.getSelectedRows().length > 1 || this.gridApi.getSelectedRows().length < 1) {
      this.toastr.error('Selecteer slechts één leverancier', 'Error', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    }
    else { this.editMode=true; }
    let selectedRows = this.gridApi.getSelectedRows();
    this.mySupplier = selectedRows[0].name;
  }
  saveChanges(){
    this.suppliersService.editSupplier(this.myId, this.mySupplier);
    this.toastr.success('Leverancier bewerkt', 'Success', {positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000});
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
