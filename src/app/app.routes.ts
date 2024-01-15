import { Routes } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { StockaddComponent } from './stockadd/stockadd.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
// import { IngredientComponent } from './ingredient/ingredient.component';
// import { IngredientaddComponent } from './ingredientadd/ingredientadd.component';
// import { IngredienteditComponent } from './ingredientedit/ingredientedit.component';
import { StockeditComponent } from './stockedit/stockedit.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'stock',
        component: StockComponent
    },
    {
        path: 'stockadd',
        component: StockaddComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    // {
    //     path: 'ingredient',
    //     component: IngredientComponent
    // },
    // {
    //     path: 'ingredientadd',
    //     component: IngredientaddComponent
    // },
    // {
    //     path: 'ingredientedit',
    //     component: IngredienteditComponent
    // },
    {
        path: 'stockedit',
        component: StockeditComponent
    }
];
