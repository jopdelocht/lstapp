import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { StockComponent } from './stock/stock.component';
import { StockaddComponent } from './stockadd/stockadd.component';
import { StockeditComponent } from './stockedit/stockedit.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { IngredientaddComponent } from './ingredientadd/ingredientadd.component';
import { IngredienteditComponent } from './ingredientedit/ingredientedit.component';
import { ProductsComponent } from './products/products.component';
import { ProductsaddComponent } from './productsadd/productsadd.component';
import { ProductseditComponent } from './productsedit/productsedit.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SuppliersaddComponent } from './suppliersadd/suppliersadd.component';
import { SupplierseditComponent } from './suppliersedit/suppliersedit.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OrdereditComponent } from './orderedit/orderedit.component';

// Auth guard and login component
import { authGuard } from './auth.guard';

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
        canActivate: [authGuard],
        component: StockaddComponent
    },
    {
        path: 'stockedit',
        canActivate: [authGuard],
        component: StockeditComponent
    },
    {
        path: 'ingredient',
        component: IngredientComponent
    },
    {
        path: 'ingredientadd',
        canActivate: [authGuard],
        component: IngredientaddComponent
    },
    {
        path: 'ingredientedit',
        canActivate: [authGuard],
        component: IngredienteditComponent
    },
    {
        path: 'login',
        component: LoginComponent

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'productsadd',
        canActivate: [authGuard],
        component: ProductsaddComponent
    },
    {
        path: 'productsedit',
        canActivate: [authGuard],
        component: ProductseditComponent
    },
    {
        path: 'suppliers',
        component: SuppliersComponent
    },
    {
        path: 'suppliersadd',
        canActivate: [authGuard],
        component: SuppliersaddComponent
    },
    {
        path: 'suppliersedit',
        canActivate: [authGuard],
        component: SupplierseditComponent
    },
    {
        path: 'orders',
        component: OrdersComponent
    },
    {
        path: 'orderedit',
        canActivate: [authGuard],
        component: OrdereditComponent
    }
];
