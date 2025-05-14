import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PessoaUsuaria } from '../types/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private urlApi: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { };

  cadastrar(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.httpClient.post<PessoaUsuaria>(`${this.urlApi}/auth/cadastro`, pessoaUsuaria);
  };

  buscarCadastro(): Observable<PessoaUsuaria> {
    return this.httpClient.get<PessoaUsuaria>(`${this.urlApi}/auth/perfil`);
  };

  editarCadastro(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.httpClient.patch<PessoaUsuaria>(`${this.urlApi}/auth/perfil`, pessoaUsuaria);
  };
}
