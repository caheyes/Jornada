import { TokenService } from './../services/token.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken();

      //clonar requisição ao invés de enviar ela diretamente, e não modificar deixando a requisição original intacta
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
    };

    return next.handle(request);
  }
}
