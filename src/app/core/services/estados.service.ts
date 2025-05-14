import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estado } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class EstadosService {
  private apiUrl: string = environment.apiUrl;
  private cache$?: Observable<Estado[]>;

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<Estado[]> {
    if(!this.cache$) {
      this.cache$ = this.requestEstados().pipe(
        //O operador shareReplay é verificado se já existe uma resposta armazenada em cache. Se sim, essa resposta é retornada diretamente, evitando uma nova chamada à API. Caso contrário, é feita a requisição e o resultado é armazenado em cache para futuras requisições.
        shareReplay(1)
      )
    };

    return this.cache$;
  }

  private requestEstados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(`${this.apiUrl}/estados`);
  }
}
