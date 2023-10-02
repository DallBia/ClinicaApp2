import { UserService } from 'src/app/services/user.service';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { SharedService } from 'src/app/shared/shared.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent {
  subscription: Subscription;
  subscription0!: Subscription;
  nChanges!: boolean;
  public CelAtual!: Agenda;
  public nUser: any;
  public nUnit: any;
  public nSala: any;
  public nHora: any;
  public nDia: any;
  public Usr!: User | null;

  ngOnInit(): void {

    this.clienteService.BuscaClientes()
    this.agendaService.BuscaAgenda(new Date().toISOString().split('T')[0])
    this.agendaService.dHora = '';
    this.agendaService.dSala = 0;
    this.agendaService.dCliente = '';

    this.subscription = this.agendaService.CelA$.subscribe(
      name => {
        this.CelAtual = name
      }
    );
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

  }


  constructor(private userService: UserService, public agendaService: AgendaService, private sharedService: SharedService, public clienteService: ClienteService) {

    this.subscription = this.clienteService.ChangesA$.subscribe(
      name => this.nChanges = name
    )


  }

  setStatus(status: string){
    this.CelAtual.status = status;
    this.agendaService.setCelA(this.CelAtual);
  }

  salvaSessao(){
    let Dados: Agenda = {

    };

    Dados.dia = this.nDia;
    Dados.unidade = this.nUnit;
    Dados.sala = this.agendaService.dSala;
    Dados.horario = this.agendaService.dHora;
    Dados.idFuncAlt = this.nUser;
    const dataAtual = new Date();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();

    const horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    this.Usr = this.userService.getUserA().getValue();
    if(this.CelAtual.idCliente == 0 || this.CelAtual.idCliente == undefined){
      Dados.historico = this.agendaService.dCliente + '֍' + this.CelAtual.historico;
    }
      Dados.historico += '\n' +new Date().toLocaleDateString('pt-BR') + ' - ' +  horaFormatada + ':\nAgendamento de ' + this.CelAtual.subtitulo + '.\npor: ' + this.Usr?.name + '\nꟷꚚꟷ\n';

    let sessao = '';
    switch (this.CelAtual.repeticao){
      case 'Sessão única':
        sessao = 'Sessão_Única';
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
        sessao = 'Terminar_Repetições';
        break;
      default:
        sessao = 'Sessão_Única';
    }
    Dados.repeticao =  sessao;
    Dados.idCliente = this.CelAtual.idCliente;
    Dados.subtitulo = this.CelAtual.subtitulo;
    Dados.id = this.CelAtual.id;
    Dados.status = this.CelAtual.status;
    Dados.obs = this.CelAtual.obs;
    Dados.diaDaSemana = this.CelAtual.diaDaSemana;

    if(Dados.id == 0 || Dados.id == undefined){
      this.salvaAgenda(Dados)
    }
    else{
      this.updateAgenda(Dados.id, Dados)
    }
  }

  updateAgenda(id: number, texto: Agenda) {
    this.agendaService.UpdateAgenda(id, texto).subscribe(
      (data) => {
        this.delay(300);
        alert('Sessão atualizada!');
        this.delay(300);
        location.reload();
      },
      (error) => {
        console.error('Erro no upload', error);
      }
    );
  }

  salvaAgenda(texto: Agenda) {
    this.agendaService.CreateAgenda(texto).subscribe(
      (data) => {
        this.delay(300);
        alert('Sessão gravada!');
        this.delay(300);
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
