import { Routes } from '@angular/router';
import { StockComponent } from './stock/stock.component';
import { HomeComponent } from './home/home.component';
import { StockaddComponent } from './stockadd/stockadd.component';

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
    }
];
