import { UserService } from './user.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface AuthResponse {
  access_token: string
};

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) { };

  //AuthResponse Retorna um Observable com a resposta completa do HTTP (inclusive headers, status, etc.).
  autenticar(email: string, senha:string): Observable<HttpResponse<AuthResponse>> {
    //Usa { observe: 'response' } para observar a resposta completa (e não apenas o body)
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/auth/login`, {email, senha}, {observe: 'response'})
    .pipe(
      //tap operador que permite executar efeitos colaterais (como salvar token), sem alterar o fluxo dos dados.
      tap((response) => {
        const authtoken = response.body?.access_token || '';
        this.userService.salvarToken(authtoken);
      })
    );
  }
}
