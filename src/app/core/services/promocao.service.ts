import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocao } from '../types/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {
  private apiUrl: string = environment.apiUrl; //por padrao utilizar o env principal e não o dev

  constructor(
    private httpClient: HttpClient
  ) { }

  listar(): Observable<Promocao[]> {
    return this.httpClient.get<Promocao[]>(`${this.apiUrl}/promocoes`);
  };
}
