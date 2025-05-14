import { inject } from "@angular/core";
import { UserService } from "../services/user.service"
import { Router } from "@angular/router";

//estou usando a Abordagem funcional, mas existe a Abordagem de criação de classes

export const authGuard = () => {
  //sem constructor, faz dessa forma para pegar a service
  const userService = inject(UserService);
  const router = inject(Router);

  if(userService.estaLogado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}


//essa é a versao criacao de classes

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { UserService } from '../services/user.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(
//     private userService: UserService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     if (this.userService.estaLogado()) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
