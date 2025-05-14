import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//ValidatorFn = VALIDAÇÃO PERSONALIZADA
export class FormValidations {
  static equalTo(otherField: string): ValidatorFn {
    // AbstractControl AbstractControl é uma classe abstrata que serve como a classe base para os controles de formulário no Angular. Ela encapsula os comportamentos e propriedades comuns a todos os tipos de controles, como campos de entrada de texto, seleção, caixas de seleção e muito mais. AbstractControl fornece métodos para realizar validações, manipular estados e valores do controle, e também lidar com eventos relacionados a formulários.
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value;
      //acessando raiz do form root
      const otherFieldValue = control.root.get(otherField)?.value;

      if(fieldValue !== otherFieldValue) {
        return {equalTo: true}
      };

      return null;
    }
  }
}
