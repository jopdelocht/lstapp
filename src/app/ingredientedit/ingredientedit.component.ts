import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
// grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
// import services
import { IngredientsService } from '../shared/ingredients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ingredientedit',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterOutlet, AgGridModule],
  templateUrl: './ingredientedit.component.html',
  styleUrl: './ingredientedit.component.css'
})
export class IngredienteditComponent {
  selectedRows: any;
  constructor(private ingredientsService: IngredientsService, private toastr: ToastrService) { }
  allergens: any
  ingredientsURL: string = this.ingredientsService.ingredientsURL
  allergensURL: string = this.ingredientsService.allergensURL
  ingredients: any[] = []
  gridApi: any
  columnApi: any
  editMode: boolean = false
  myId: any
  myIngredient: any
  myAllergens: any
  rowData: any[] | undefined
  rowDataEdit: any[] | undefined
  ingredientName: string = ''

  ngOnInit() {
    this.getIngredients();
    this.getAllergens();
  }

  getIngredients() {
    this.ingredientsService.getIngredients().then((data) => {
      this.ingredients = data;
      this.rowData = this.ingredients
      console.log(this.ingredients)
    })
  }
  getAllergens() {
    this.ingredientsService.getAllergens().then((data) => {
      this.allergens = data
      console.log(this.allergens)
      this.rowDataEdit = this.allergens
    })
  }
  colDefs: ColDef[] = [
    {
      field: "Ingredient",
      filter: true,
      headerName: 'Ingrediënt',
      minWidth: 280,
      checkboxSelection: true
    },
    {
      field: "Allergen",
      filter: true,
      headerName: 'Allergenen',
      minWidth: 280
    },
  ]
 colDefsEdit: ColDef[] = [
  {
    field: "name",
    filter: true,
    headerName: 'Allergenen',
    minWidth: 280,
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
  editCurrentRow() {
    console.log(this.gridApi.getSelectedRows())
    if (this.gridApi.getSelectedRows().length > 1 || this.gridApi.getSelectedRows().length < 1) {
      this.toastr.error('Selecteer slechts één ingrediënt', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }else {
    this.editMode = true
    this.myId = this.gridApi.getSelectedRows()[0].Ingredient_id
    this.ingredientName = this.gridApi.getSelectedRows()[0].Ingredient
    }
  }
  deleteSelectedRows() {
    if (this.gridApi.getSelectedRows().length == 0) {
        this.toastr.error('Geen ingrediênt geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
      } else {
      let selectedRows = this.gridApi.getSelectedRows();
      let idArray = selectedRows.map((x: { Ingredient_id: any; }) => x.Ingredient_id);
      console.log(idArray)
      idArray.forEach((ingredient_id: any) => {
        this.ingredientsService.deleteIngredient(ingredient_id);
      })
      if (idArray.length > 1) {
        this.toastr.success('Ingrediënten verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
      } else {
        this.toastr.success('Ingrediënt verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
      }
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    }
  }
  saveChanges() {
    if (this.ingredientName) {
      this.selectedRows = this.gridApi.getSelectedRows();
      // map the selected rows
      this.myAllergens = this.selectedRows.map((x: { id: any; }) => x.id);
      // convert myAllergens to a string
      this.myAllergens = this.myAllergens.join(',');
      this.myIngredient = this.ingredientName
      console.log(this.myId, this.ingredientName, this.myAllergens)
      this.ingredientsService.editIngredient(this.myId, this.ingredientName, this.myAllergens);
      this.toastr.success('Ingrediënt bewerkt', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
      setTimeout(() => {
        window.location.reload()
      },2000)
    }
  }
}
