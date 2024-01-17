import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const  token  = localStorage.getItem('token');
	if (token) {
			return  true;
		} else {
			window.location.href  =  '/login';
		return  false;
		}
};
