import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { FormsModule } from '@angular/forms';
import {FiltroService } from '../../services/filtro.service'
import { ClienteService } from 'src/app/services/cliente/cliente.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})

export class FiltroComponent implements OnInit {

  public formD: string = '';
  opcaoSelecionada: string = '';
  parametro: string = '';
  public AtivoCheck: boolean = true;
  public InativoCheck: boolean = false;
  myForm: FormGroup;

  public opcoes!: string[];
  constructor(private fb: FormBuilder,
                public shared: SharedService,
                public filtroService: FiltroService,
                public clienteService: ClienteService) {

    this.myForm = this.fb.group({
      username: [''],
      selectedOpcao: [''],
    });
  }

  ngOnInit(): void {
    if (this.shared.pagina == '/cadprof'){
      this.opcoes = ['Nome', 'Perfil', 'Área','Nível de Graduação'];
    }else{
      this.opcoes = ['Nome', 'Nome da Mãe', 'Área','Idade'];
    }
  }

  AttParam(valor: any){
  this.formD = valor;
  }

  onSubmit() {
    this.formD = this.myForm.value;
  }

  async aplicaFiltro(){
    const data = await this.filtroService.GetClientebyFiltro(this.opcaoSelecionada,this.parametro,"0");
    const dados = data.dados;
    const mensagem = data.mensagem;
    this.shared.validFiltro = true;
    this.clienteService.setListaCliente(dados);
    this.clienteService.data = data;
    const r = await this.clienteService.Carregar();
  }
}

