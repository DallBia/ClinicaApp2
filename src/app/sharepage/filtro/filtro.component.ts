import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {
  public formD: string = '';
  myForm: FormGroup;
  opcoes = ['Nome', 'Nome da Mãe', 'Área','Idade'];
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      username: [''],
      selectedOpcao: [''],
    });
  }

  ngOnInit(): void {}

  AttParam(valor: any){
  this.formD = valor;
  }

  onSubmit() {
    this.formD = this.myForm.value;
  }
}

