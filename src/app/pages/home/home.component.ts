import { Component, OnInit } from '@angular/core';
import { DepoimentoService } from 'src/app/core/services/depoimento.service';
import { PromocaoService } from 'src/app/core/services/promocao.service';
import { Depoimento, Promocao } from 'src/app/core/types/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  promocoes: Promocao[] = [];
  depoimentos: Depoimento[] = [];

  constructor (
    private servicePromocao: PromocaoService,
    private serviceDepoimento: DepoimentoService
  ) {

  }

  ngOnInit(): void {
    this.listarPromocoes();
    this.listarDepoimentos();
  }

  //get
  listarPromocoes() {
    this.servicePromocao.listar()
    .subscribe(res => {
      this.promocoes = res;
    });
  };

  listarDepoimentos() {
    this.serviceDepoimento.listar()
    .subscribe(res => {
      this.depoimentos = res;
    })
  }
}
