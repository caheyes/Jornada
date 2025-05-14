import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../types/type';
import { TokenService } from './token.service';
//jwtDecode Biblioteca que decodifica um JWT (JSON Web Token), extraindo os dados codificados (como email, nome, etc).
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  //declaração de uma instância de BehaviorSubject que armazenará as informações do usuário logado ou null caso não haja usuário logado. Um BehaviorSubject é um tipo de Subject que emite o último valor emitido e os novos valores assim que um novo observador se inscreve.
  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(
    private tokenService: TokenService
  ) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as PessoaUsuaria;
    this.userSubject.next(user);
  };

  retornarUser() {
    //retornando como um observable
    return this.userSubject.asObservable();
  };

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  };

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  };

  estaLogado() {
    return this.tokenService.possuiToken();
  }
}
