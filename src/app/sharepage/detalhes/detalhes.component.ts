import { UserService } from 'src/app/services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { SharedService } from 'src/app/shared/shared.service';
import { User } from 'src/app/models';
import { Cliente } from 'src/app/models/Clientes';
import { AfterViewInit } from '@angular/core';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';
import { Colaborador } from 'src/app/models/Colaboradors';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements AfterViewInit, OnInit, OnDestroy {
  subscription: Subscription;
  subscription0: Subscription;
  nChanges!: boolean;
  public CelAtual!: Agenda;
  public nUser: any;
  public nUnit: any;
  public nSala: any;
  public nHora: any;
  public nDia: any;
  public Usr!: User | null;
  public ListaCliente: Cliente[] = [];
  public ListaColab: Colaborador[] = [];
  public nCliente: any
  ngOnInit(): void {


  }

  ngOnDestroy(): void {

    this.subscription0.unsubscribe;
    this.subscription.unsubscribe;
  }

  atualizarListaClientes(clientes: Cliente[]): void {
    // Atualize a lista de clientes para o datalist
    const datalist = document.getElementById('valores');
      if(datalist){
    datalist.innerHTML = '';

    clientes.forEach(cliente => {
      const option = document.createElement('option');
      option.textContent = cliente.nome;
      datalist.appendChild(option);
    });
  }
  }

  atualizarListaColabs(colabs: any[]): void {
    const datalist = document.getElementById('valores1');
      if(datalist){
    datalist.innerHTML = '';

    colabs.forEach(colab => {
      const option = document.createElement('option');
      option.textContent = colab.nome;
      datalist.appendChild(option);
    });
  }
  }

  constructor(private userService: UserService,
    public agendaService: AgendaService,
    private colaboradorService: ColaboradorService,
    public clienteService: ClienteService) {
    this.subscription = this.agendaService.CelA$.subscribe(
      name => {
        this.CelAtual = name
      });
    this.subscription0 = this.userService.EquipeA$.subscribe(
      nameC => this.nUser = nameC
    )
    this.subscription0 = this.agendaService.UnitA$.subscribe(
      nameC => this.nUnit = nameC
    )


    this.subscription0 = this.agendaService.BuscaA$.subscribe(
      name => {
        const DH = name.split('%');
        this.nDia = DH[0];
        this.nUnit = parseInt(DH[1]);
      }
    );
    this.subscription = this.clienteService.ChangesA$.subscribe(
      name => this.nChanges = name
    )

    this.subscription = this.clienteService.ListaCliente$.subscribe(
      nameC => {
        this.ListaCliente = nameC
        this.atualizarListaClientes(nameC);
      });
  }
  ngAfterViewInit(): void {

        this.ListaCliente = this.clienteService.clientes
        this.atualizarListaClientes(this.ListaCliente);

      this.ListaColab = this.colaboradorService.colaboradors;
      this.atualizarListaColabs(this.ListaColab);
  }

  setStatus(status: string){
    if(status == 'Bloqueado'){
      console.log(this.agendaService.dCliente + '//' + this.CelAtual.subtitulo)
      if (this.agendaService.dCliente !== ''
          || this.CelAtual.subtitulo !== undefined){
            alert('Só é possível bloquear um horário vago. Por favor, limpe o horário antes de bloquear.');
      }else{
        this.CelAtual.status = status;
        this.agendaService.setCelA(this.CelAtual);
      }
    }else{
      this.CelAtual.status = status;
      this.agendaService.setCelA(this.CelAtual);
    }

  }

  salvaSessao(){
    let Dados: Agenda = {

    };
    const DadosA = this.agendaService.getCelAnt();
    console.log(DadosA)
    let texto: string = '';
    let nomeCl: string = '';
    Dados.dia = this.nDia;
    Dados.unidade = this.nUnit;
    Dados.sala = this.agendaService.dSala;
    Dados.horario = this.agendaService.dHora;
    Dados.idFuncAlt = this.nUser;
    Dados.status = this.CelAtual.status;
    const dataAtual = new Date();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();

    if(this.agendaService.dHora == 'manhã' || this.agendaService.dHora == 'tarde'){
      for (let i of this.colaboradorService.colaboradors){
        if(this.agendaService.dCliente == i.nome){
          nomeCl = i.nome;
          this.CelAtual.idCliente = i.id;
          break;
        }
      }
      Dados.status = "Sala";
    }else{
      for (let i of this.clienteService.clientes){
      if(this.agendaService.dCliente == i.nome){
        nomeCl = i.nome;
        this.CelAtual.idCliente = i.id;
        break;
      }
    }
    }

    const horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    this.Usr = this.userService.getUserA().getValue();
    if(this.CelAtual.idCliente == 0 || this.CelAtual.idCliente == undefined){
      Dados.historico = this.agendaService.dCliente + '֍' + this.CelAtual.historico;
    }else{
      Dados.historico = '֍' + this.CelAtual.historico;
    }
    if (DadosA.dtAlt == ''){
      texto += 'Agendamento de ' + this.CelAtual.subtitulo + '. ';
    }else{
      if (DadosA.status !== this.CelAtual.status){
        texto += 'Novo status: ' + this.CelAtual.status + '. ';
      }
      if (nomeCl !== this.agendaService.dCliente){
        texto += 'Cliente alterado: de ' + nomeCl + ' para ' + this.agendaService.dCliente + '. ';
      }
      if (DadosA.repeticao !== this.CelAtual.repeticao){
        texto += 'Repetição alterada: de ' + DadosA.repeticao + ' para ' + this.CelAtual.repeticao + '. ';
      }
    }

      Dados.historico += '\n' +new Date().toLocaleDateString('pt-BR') + ' - ' +  horaFormatada + ':\n' + texto  + '\npor: ' + this.Usr?.name + '\nꟷꚚꟷ\n';

    let sessao = '';
    switch (this.CelAtual.repeticao){
      case 'Sessão única':
        sessao = 'Unica';
        break;
      case 'Diária':
        sessao = 'Diaria';
        break;
      case 'Semanal':
        sessao = 'Semanal';
        break;
      case 'Quinzenal':
        sessao = 'Quinzenal';
        break;
      case 'Mensal':
        sessao = 'Mensal';
        break;
      case 'Cancelar Repetição':
        sessao = 'Cancelar';
        break;
      default:
        sessao = 'Unica';
    }
    if(Dados.status !== 'Vago') {
      Dados.repeticao =  sessao;
      Dados.idCliente = this.CelAtual.idCliente;
      Dados.subtitulo = this.CelAtual.subtitulo;
      Dados.id = this.CelAtual.id;
      Dados.obs = this.CelAtual.obs;
      Dados.diaDaSemana = this.CelAtual.diaDaSemana;
    }else{
      Dados.historico = Dados.historico + 'Sessão anterior Excluída.'
      Dados.historico += '\n' +new Date().toLocaleDateString('pt-BR') + ' - ' +  horaFormatada + ':\n' + texto  + '\npor: ' + this.Usr?.name + '\nꟷꚚꟷ\n';
      Dados.repeticao = 'Cancelar';
      Dados.idCliente = 0;
      Dados.subtitulo = '';
      Dados.obs = this.CelAtual.obs;
      Dados.diaDaSemana = this.CelAtual.diaDaSemana;
      Dados.id = this.CelAtual.id;
    }


    if(Dados.id == 0 || Dados.id == undefined){
      this.salvaAgenda(Dados)
    }
    else{
      this.updateAgenda(Dados.id, Dados)
    }
  }

  updateAgenda(id: number, texto: Agenda) {
    console.log(texto)
    this.agendaService.UpdateAgenda(id, texto).subscribe(
      (data) => {
        this.delay(100);
        alert('Sessão atualizada!');
        this.delay(100);
        location.reload();
      },
      (error) => {
        console.error('Erro no upload', error);
      }
    );
  }

  salvaAgenda(texto: Agenda) {
    console.log(texto)
    this.agendaService.CreateAgenda(texto).subscribe(
      (data) => {
        this.delay(100);
        alert('Sessão gravada!');
        this.delay(100);
        location.reload();
      },
      (error) => {
        console.error('Erro no upload', error);
      }
    );
  }
  delay(time:number) {
    setTimeout(() => {

    }, time);
  }
}
