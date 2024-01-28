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
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {

  constructor(
    private ordersService: OrdersService,
    private ingredientsService: IngredientsService,
    private RecipeProductService: RecipeProductService,
    private ClientsService: ClientsService,
    private toastr: ToastrService
  ) { }

  // needed for callback filter method
  myRecipe: any;
  // array for storing recipeproducts
  recipeproducts: any[] = [];
  // array for storing the filtered recipes
  filteredRecipes: any[] = [];
  firstFilteredRecipe: any;
  // input field for the desired quantity
  myQuantity: number = 0;
  // storing freshly calculated values in this array
  calculatedValues: any[] = []
  calculatedValue: any = {};
  firstCalculatedValue: any;
  // array for storing all fetched ingredients
  ingredientsArray: [{}] = [{}];
  // array for storing all fecthed orders
  orders: [{}] = [{}];
  // array for storing all fetched clients
  clients: any[] = [];
  // storing the client id
  myClient: any;
  // storing the result of the ingredientnames and allergennames method
  ingredientNames: any;
  allergenNames: any;
  // needed for grid
  gridApi: any;
  columnApi: any;
  // storing the order
  myOrder: any;
  // storing deliverydate and orderdate
  deliveryDate: Date = new Date();
  orderDate: Date = new Date();

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  async fetchRecipeProduct() {
    this.recipeproducts = await this.RecipeProductService.getRecipeProduct();
  }

  async fetchIngredients() {
    this.ingredientsArray = await this.ingredientsService.getIngredients();
  }

  async fetchOrders() {
    this.orders = await this.ordersService.getOrders();
    this.rowData = this.orders;
  }

  async fetchClients() {
    this.clients = await this.ClientsService.getClients();
  }

  // to make sure there are no duplicate recipes
  getUniqueRecipes(): string[] {
    return Array.from(new Set(this.recipeproducts.map(item => item.recipename)));
  }

  // 1) using filter array method, does a callback on every item in the array and returns a new array with the results
  // 2) it also checks for the FIRST filtered recipe and stores it in a variable, to show the title, basevalue and measurement - ONLY ONCE!
  checkForRecipeIncludes() {
    this.filteredRecipes = this.recipeproducts.filter(item => item.recipename === this.myRecipe);
    if (this.filteredRecipes.length > 0) {
      this.firstFilteredRecipe = this.filteredRecipes[0];
    } else {
      this.firstFilteredRecipe = null;
    }
    return this.filteredRecipes;
  }

  // 1) calculates the new values for the desired recipe and puts them in a COPY of the original array named calculatedValues
  // 2) it also checks for the FIRST calculated value and stores it in a variable, to show the title, desired quantity and measurement - ONLY ONCE!
  calculateNewValues(filteredRecipes: any[]) {
    this.calculatedValues = Array.from(filteredRecipes, product => {
      return {
        ...product,
        quantity: (product.quantity / product.basevalue) * this.myQuantity
      };
    });

    if (this.calculatedValues.length > 0) {
      this.firstCalculatedValue = this.calculatedValues[0];
      this.calculatedValue = this.firstCalculatedValue; // update calculatedValue here
    } else {
      this.firstCalculatedValue = null;
      this.calculatedValue = null; // update calculatedValue here
    }
    // show information message
    this.toastr.info('Klik op het plus-icoon langs het recepitem om deze toe te voegen aan de lijst van orderitems', 'Recept berekend', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 5000 });

    console.log(this.firstCalculatedValue);
    this.ingredientNames = this.getIngredientNames(this.calculatedValues, this.ingredientsArray);
    this.allergenNames = this.findAllergens(this.calculatedValues, this.ingredientsArray);

    return this.firstCalculatedValue, this.ingredientNames, this.allergenNames;
  }

  // This function searches the ingredients array for the NAMES of the INGREDIENTS corresponding to the ID's of the products used in the recipe
  // The numbers it's using are coming from the freshly calculated array of recipeproducts
  getIngredientNames(array1: any[], array2: any[]): string {
    let allIngredientNames: string[] = [];
    array1.forEach(item => {
      const ingredientNumbers = item.ingredients.split(',').map(Number);
      const ingredientNames = ingredientNumbers.map((number: any) => {
        const ingredient = array2.find(ingredient => ingredient.Ingredient_id === number);
        return ingredient ? ingredient.Ingredient : '';
      });
      allIngredientNames = [...allIngredientNames, ...ingredientNames];
    });

    const uniqueIngredientNames = [...new Set(allIngredientNames)];
    const uniqueIngredientNamesStr = uniqueIngredientNames.join(', ');

    return uniqueIngredientNamesStr;
  }

  findAllergens(recipe: any[], ingredients: any[]): string {
    let allergens: string[] = [];
    // Iterate over each item in the recipe array
    recipe.forEach(item => {
      // Split the ingredients string into an array of IDs
      const ids = item.ingredients.split(',').map(Number);
      // For each ID, find the matching ingredient in the ingredients array
      ids.forEach((id: any) => {
        const ingredient = ingredients.find(i => i.Ingredient_id === id);
        // If a match was found, split the Allergen string into an array and add it to the allergens array
        if (ingredient && ingredient.Allergen) {
          allergens = allergens.concat(ingredient.Allergen.split(','));
        }
      });
    });
    // Remove duplicates and join the array into a comma-separated string
    return [...new Set(allergens)].join(', ');
  }

  async postOrder(calculatedItem: any) {
    // Access the service and send a orderitem
    await this.ordersService.postOrder(
      this.myClient,
      this.myQuantity,
      calculatedItem.recipename,
      calculatedItem.quantity,
      calculatedItem.productname,
      calculatedItem.measurement,
      this.ingredientNames,
      this.allergenNames,
      this.deliveryDate,
      this.orderDate.toLocaleDateString('be-BE', { year: 'numeric', month: '2-digit', day: '2-digit' })
    )
    // show success message
    this.toastr.success('Orderitem toegevoegd', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    // Refresh grid
    this.fetchOrders();
  };

  async deleteSelectedRowFromStock() {
    if (this.gridApi.getSelectedRows().length == 0) {
      this.toastr.error('Geen producten geselecteerd', 'Error', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    } else {
      let selectedRows = this.gridApi.getSelectedRows();
      let lineItemId = selectedRows.map((x: { orderid: any; }) => x.orderid)[0];
      this.ordersService.fulfillLineItem(lineItemId);
      this.toastr.success('Orderitem verwijderd uit stock', 'Success', { positionClass: 'toast-top-right', progressBar: true, progressAnimation: 'decreasing', timeOut: 3000 });
    }
  }





  ngOnInit() {
    this.fetchRecipeProduct();
    this.getUniqueRecipes();
    this.fetchIngredients();
    this.fetchOrders();
    this.fetchClients();
  }

  // assign rowdata to grid
  rowData = this.orders;
  // define table columns
  colDefs: ColDef[] = [
    {
      field: "clientname",
      filter: true,
      headerName: 'Klantnaam',
      maxWidth: 140,
      checkboxSelection: true
    },
    {
      field: "deliverydate",
      filter: true,
      headerName: 'Leverdatum',
      sortIndex: 0,
      sort: 'asc',
      maxWidth: 150,
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
      maxWidth: 145,
      cellStyle: { fontWeight: 'Bold' }
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
      maxWidth: 150,
      cellStyle: { fontWeight: 'Bold' }
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
    },
    {
      field: "orderdate",
      filter: true,
      headerName: 'Orderdatum',
    }
  ];
}
