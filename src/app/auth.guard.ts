import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = !!sessionStorage.getItem("LoggedInUser");
  const router = inject(Router);

  if (isLoggedIn) {
    return true; // Allow navigation
  } else {
    return router.createUrlTree(['login']); // Redirect to the login page
  }
};
