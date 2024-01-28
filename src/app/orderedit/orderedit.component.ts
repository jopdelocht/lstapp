import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
//import services
import { OrdersService } from '../shared/orders.service';
import { RecipeProductService } from '../shared/recipeproduct.service';
import { IngredientsService } from '../shared/ingredients.service';
import { ClientsService } from '../shared/clients.service';
//import formsmodule
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orderedit',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './orderedit.component.html',
  styleUrl: './orderedit.component.css'
})
export class OrdereditComponent {
  gridApi: any;
  columnApi: any;
  recipeproducts: any;
  ingredientsArray: any;
  orders: any;
  rowData: any;
  clients: any;
  editMode: boolean = false;
  myClient: any;
  myRecipe: any;
  recipes: any;

  constructor(
    private ordersService: OrdersService,
    private ingredientsService: IngredientsService,
    private RecipeProductService: RecipeProductService,
    private ClientsService: ClientsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.fetchRecipeProduct();
    this.fetchIngredients();
    this.fetchOrders();
    this.fetchClients();
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }
  async fetchRecipeProduct() {
    this.recipeproducts = await this.RecipeProductService.getRecipeProduct();
    console.log("recipeproducts", this.recipeproducts)
  }

  async fetchIngredients() {
    this.ingredientsArray = await this.ingredientsService.getIngredients();
    console.log("ingredients", this.ingredientsArray)
  }

  async fetchOrders() {
    this.orders = await this.ordersService.getOrders();
    this.rowData = this.orders;
    console.log("orders", this.orders)
  }

  async fetchClients() {
    this.clients = await this.ClientsService.getClients();
    console.log("clients", this.clients)
  }
  // Grid settings
  colDefs: ColDef[] = [
    {
      field: "clientname",
      filter: true,
      headerName: 'Klantnaam',
      maxWidth: 150,
      sortIndex: 0,
      sort: 'asc',
      checkboxSelection: true
    },
    {
      field: "totalquantity",
      filter: true,
      headerName: 'Totaal (g)',
      maxWidth: 120
    },
    {
      field: "recipe",
      filter: true,
      headerName: 'Recept',
      maxWidth: 115
    },
    {
      field: "productquantity",
      filter: true,
      headerName: 'Hoeveelheid',
      maxWidth: 145
    },
    {
      field: "type",
      filter: true,
      headerName: 'Eenheid',
      maxWidth: 115
    },
    {
      field: "product",
      filter: true,
      headerName: 'Product',
      maxWidth: 150
    },
    {
      field: "ingredient",
      filter: true,
      headerName: 'Ingrediënten'
    },
    {
      field: "allergen",
      filter: true,
      headerName: 'Allergenen'
    }
  ];

  getSelectedRows() {
    let selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows)
  }

  deleteSelectedRows() {
    // get array of the selected rows
    this.getSelectedRows();
    if (this.gridApi.getSelectedRows().length == 0) {
      this.toastr.error('Geen orderitems geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
    let selectedRows = this.gridApi.getSelectedRows();
    let idArray = selectedRows.map((x: { orderid: any; }) => x.orderid);
    idArray.forEach((orderid: any) => {
      this.ordersService.deleteOrder(orderid);
    })
    if (idArray.length > 1) {
      this.toastr.success('Orderitems verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
      this.toastr.success('Orderitem verwijderd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
  //   editCurrentRow() {
  //     if (this.gridApi.getSelectedRows().length == 0) {
  //       this.toastr.error('Geen orders geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
  //     }else {
  //     this.getSelectedRows();
  //     this.editMode = true
  //   }
  // }
}
