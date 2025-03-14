import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


const jwtHelper: JwtHelperService  = new JwtHelperService()

export const LoginGuard: CanActivateFn = (route, state) => {
  // Obtener el servicio JwtHelperService y Router

  const router = inject(Router);

  // Obtener el token del localStorage o de donde lo estés almacenando
  const token = localStorage.getItem('token');

  // Verificar si el token existe y si no ha expirado
  if (token && !jwtHelper.isTokenExpired(token)) {
    // El token es válido, podemos permitir el acceso
    return true;
  } else {
    // El token no existe o ha expirado, redirigir a la página de login
    router.navigate(['/inicio']);
    return false;
  }
};
