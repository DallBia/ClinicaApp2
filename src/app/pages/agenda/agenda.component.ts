import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CelAgendaComponent } from 'src/app/sharepage/cel-agenda/cel-agenda.component';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, OnDestroy{

  valor: string = '';
  public colunas: number[] = [];
  public linhas: number[] = [];
  public OkCliente: any;
  public OkAgenda: any;

ngOnInit(){

  this.main();


}


  constructor(private agendaService: AgendaService,
              private clienteService: ClienteService) {

  }

async main(){
  this.OkAgenda = await this.Dados1();
  this.OkCliente = await this.Dados2();
  console.log('Ufa... Agenda ' + this.OkAgenda +' e Clientes ' + this.OkCliente)
  for (let i = 0; i <= 30; i++) {
    this.colunas.push(i);
  }
  for (let j = 1; j <= 15; j++) {
    this.linhas.push(j);
  }
}

  async Dados1(): Promise<boolean> {
    console.log('Entrando em Dados1 - Agenda')
    return new Promise<boolean>((resolve) => {
      const verificarSucesso1 = () => {
        if (this.agendaService.success === true) {
          console.log('Sucesso/Agenda:' + this.agendaService.success);
          resolve(true);
        } else {
          setTimeout(() => {
            verificarSucesso1();
          }, 300);
        }
      };

      verificarSucesso1();
    });
  }
  async Dados2(): Promise<boolean> {
    console.log('Entrando em Dados2 - Agenda')
    return new Promise<boolean>((resolve) => {
      const verificarSucesso2 = () => {
        if (this.clienteService.clientes.length !== 0) {
          console.log('Sucesso/Clientes:' + this.clienteService.clientes);
          resolve(true);
        } else {
          setTimeout(() => {
            verificarSucesso2();
          }, 300);
        }
      };

      verificarSucesso2();
    });
  }



  ngOnDestroy(){

    this.colunas = [];
    this.linhas = [];
  }




}
