import { FormularioService } from './../../core/services/formulario.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormValidations } from '../validators/form-validators';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  //Inputs
  @Input() perfilComponent: boolean = false;
  @Input() titulo: string = 'Crie sua conta';
  @Input() textoBotao: string = 'CADASTRAR';
  //Outputs
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>;
  @Output() sair: EventEmitter<any> = new EventEmitter<any>;

  //variables
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group(
      {
        nome: [null, Validators.required],
        nascimento: [null, [Validators.required]],
        cpf: [null, [Validators.required]],
        cidade: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        senha: [null, [Validators.required, Validators.minLength(3)]],
        genero: ['outro'],
        telefone: [null, Validators.required],
        estado: this.estadoControl,
        confirmarEmail: [null, [Validators.required, Validators.email, FormValidations.equalTo('email')]],
        confirmarSenha: [null, [Validators.required, Validators.minLength(3), FormValidations.equalTo('senha')]],
        aceitarTermos: [false, [Validators.requiredTrue]]
      },
    );

    if(this.perfilComponent) {
      //removendo validacao
      this.cadastroForm.get('aceitarTermos')?.setValidators(null);
    } else {
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue]);
    };

    this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();

    this.formularioService.setCadastro(this.cadastroForm);
  };

  //methods
  executarAcao() {
    this.acaoClique.emit();
  };

  deslogar() {
    this.sair.emit();
  }
}
