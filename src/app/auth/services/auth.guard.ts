import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  /*const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.checkAuthentication()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }*/

  return inject(LoginService).isAuthenticated() ? true : inject(Router).createUrlTree(['/auth/login']);
};
