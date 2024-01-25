import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import grid module
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
//import services
import { OrdersService } from '../shared/orders.service';
import { IngredientsService } from '../shared/ingredients.service';
//import formsmodule
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AgGridModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  // variable needed for callback filter method
  myRecipe: any;

  constructor(private ordersService: OrdersService, private ingredientsService: IngredientsService) { }

  // defines recipeproduct url and empty array for storing recipeproducts
  recipeproductURL = this.ordersService.recipe_productURL;
  recipeproducts: any[] = [];
  // array where i'm storing the filtered recipes
  filteredRecipes: any[] = [];
  firstFilteredRecipe: any;
  // variable coming from input field for new quantity
  myQuantity: number = 0;
  // storing freshly calculated values in this array
  calculatedValues: any[] = []
  firstCalculatedValue: any;
  // array for storing ingredients
  ingredientsArray: [{}] = [{}];


  async fetchRecipeProducts() {
    this.recipeproducts = await this.ordersService.getRecipeProduct();
    this.rowData = this.recipeproducts;
  }

  async fetchIngredients() {
    this.ingredientsArray = await this.ingredientsService.getIngredients();
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
    console.log(this.filteredRecipes);
    console.log(this.ingredientsArray);
    return this.filteredRecipes;
  }

  // 1) calculates the new values for the desired recipe and puts them in a copy of the original array named calculatedValues
  // 2) it also checks for the FIRST calculated value and stores it in a variable, to show the title, desired quantity and measurement - ONLY ONCE!
  calculateNewValues(filteredRecipes: any[]) {
    this.calculatedValues = Array.from(filteredRecipes, product => {
      return {
        ...product,
        quantity: (product.quantity / product.basevalue) * this.myQuantity
      };
    });
    console.log(this.calculatedValues);
    if (this.calculatedValues.length > 0) {
      this.firstCalculatedValue = this.calculatedValues[0];
    } else {
      this.firstCalculatedValue = null;
    }
    console.log(this.firstCalculatedValue);
    console.log('Dit zijn alle ingrediënten: ' + this.getIngredientNames(this.calculatedValues, this.ingredientsArray));
    console.log('Dit zijn alle allergenen: ' + this.findAllergens(this.calculatedValues, this.ingredientsArray));
    return this.firstCalculatedValue;
  }

  //This function searches the ingredients array for the names of the ingredients corresponding to it's ID's
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





  ngOnInit() {
    this.fetchRecipeProducts();
    this.getUniqueRecipes();
    this.fetchIngredients();
  }






  // assign rowdata to grid
  rowData = this.recipeproducts;
  // define table columns
  colDefs: ColDef[] = [
    {
      field: "recipename",
      filter: true,
      headerName: 'Receptnaam',
      minWidth: 175,
      sortIndex: 0,
      sort: 'asc'
    },
    {
      field: "basevalue",
      filter: true,
      headerName: 'Basiswaarde'
    },
    {
      field: "productname",
      filter: true,
      headerName: 'Productnaam'
    },
    {
      field: "quantity",
      filter: true,
      headerName: 'Producthoeveelheid'
    },
    {
      field: "measurement",
      filter: true,
      headerName: 'Eenheid'
    }
  ];
}

