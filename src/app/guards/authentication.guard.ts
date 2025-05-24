import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }else{
    return true;
  }


};
