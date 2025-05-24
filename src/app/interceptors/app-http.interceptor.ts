import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;

  console.log("Interceptor - URL:", request.url);
  console.log("Interceptor - Token:", token);

  if (!request.url.includes('/auth/login') ) {
    console.log("akhiran token",token);
    const newRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });


    return next(newRequest).pipe(
      catchError(error => {
        console.error('HTTP error intercepted:', error);
        return throwError(() => error);
      })
    );
  }

  return next(request);
};
