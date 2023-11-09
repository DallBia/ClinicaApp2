import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { CelAgendaComponent } from 'src/app/sharepage/cel-agenda/cel-agenda.component';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit, OnDestroy{
  private nVezes: number = 0;
  valor: string = '';
  public colunas: number[] = [];
  public linhas: number[] = [];
  public OkCliente: any;
  public OkAgenda: any;
  subscription!: Subscription;
  public NovoDia!: string;

ngOnInit(){

  // this.subscription = this.agendaService.EtapaA$.subscribe(
  //   async name => {
  //     if(name == 1){
  //       const result = await this.main();
  //     }
  window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));

  //   });
    this.subscription = this.agendaService.diaA$.subscribe(
      async name => {
        if(name !== this.NovoDia){
          this.NovoDia = name;
          const result = await this.main(name);
        }

      });
      this.subscription = this.agendaService.UnitA$.subscribe(
        async name => {

          const result = await this.montaGrade();

        });
      this.agendaService.setDiaAtual(new Date().toISOString().split('T')[0])
      //this.main(this.novoDia);



}


  constructor(private agendaService: AgendaService,
              private clienteService: ClienteService) {

  }

  onBeforeUnload(event: any): void {
    // Limpa os dados do localStorage ou sessionStorage, se necessário
    // Exemplo de limpar o localStorage
    localStorage.clear();
  }

async main(novoDia: string){
  try {
    const buscaConcluida = await this.agendaService.recarregar()
    // this.nVezes += 1;
    // console.log('Em agendaComp: ' + this.nVezes)
    if (buscaConcluida) {
      this.OkAgenda = await this.Dados1();
      this.OkCliente = await this.Dados2();
      this.montaGrade()

    } else {
      console.error('Busca de agenda não foi concluída com sucesso.');
      // Lógica para tratamento de erro, se necessário
    }
  } catch (error) {
    console.error('Erro ao buscar agenda:', error);
    // Lógica para tratamento de erro, se necessário
  }


}

montaGrade(){
  this.colunas = [];
  this.linhas = [];
  for (let i = 0; i <= 20; i++) {
    this.colunas.push(i);
  }
  for (let j = 1; j <= 15; j++) {
    this.linhas.push(j);
  }
  this.agendaService.setEtapaA(2);
}

  async Dados1(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const verificarSucesso1 = () => {
        if (this.agendaService.success === true) {
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
    return new Promise<boolean>((resolve) => {
      const verificarSucesso2 = () => {
        if (this.clienteService.clientes.length !== 0) {
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



  ngOnDestroy(): void {

    this.colunas = [];
    this.linhas = [];
      this.subscription.unsubscribe();
      window.removeEventListener('beforeunload', this.onBeforeUnload.bind(this));

  }




}
