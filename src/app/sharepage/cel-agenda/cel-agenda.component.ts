
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
@Component({
  selector: 'app-cel-agenda',
  templateUrl: './cel-agenda.component.html',
  styleUrls: ['./cel-agenda.component.css']
})



export class CelAgendaComponent implements OnInit, OnDestroy{
    public lin: number = 0;
    public col: number = 0;
    public linha1: string = '';
    public linha2: string = '';
    public l1: boolean = false;
    public c1: boolean = false;
    public agendaA!: Agenda;
    public agendaG!: Agenda[];
    public idCel: number = 0;
    public BuscaA: string = new Date().toISOString().split('T')[0] + '%1';
    private subscription!: Subscription;
    private subscription0!: Subscription;
    private subscription2!: Subscription;
    private subscription3!: Subscription;
    private subscription4!: Subscription;
    public nChanges: boolean = false;
    public UnitA: number = 0;
    public idCli: number = 0;
    public nomeProvisorio = '';

    public nCli: string = '';
    public corDeFundo: string =  "rgb(255, 255, 255)";
    public nVezes: number = 0;
    public celAtual: Agenda = {
      id: 0,
      idCliente:0,
      idFuncAlt:0,
      sala:0,
      dtAlt:'',
      status:'',
      repeticao:'',
      obs:'',
      horario:'',
      historico:'',
      diaDaSemana:'',
      dia:'',
    };

  public sala: any = [
    {n: 0, dono: 'Amélia', area: 'Arteterapia'},
    {n: 1, dono: 'Amélia', area: 'Arteterapia'},
    {n: 2, dono: 'Solange', area: 'Fisioterapia Padovan'},
    {n: 3, dono: 'Sílvia', area: 'Psicopedagogia'},
    {n: 4, dono: 'Jussara', area: 'Fonoaudiologia'},
    {n: 5, dono: 'Vanessa', area: 'Fonoaudiologia'},
    {n: 6, dono: 'Cecília', area: 'Psicomotricidade'},
    {n: 7, dono: 'Amélia', area: 'Neurofeedback'},
    {n: 8, dono: 'Angélica', area: 'Psicomotricidade'},
    {n: 9, dono: 'Mariana', area: 'Neurofeedback'},
    {n: 10, dono: 'Júlia', area: 'Fisioterapia Padovan'},
    {n: 11, dono: 'Beatriz', area: 'Arteterapia'},
    {n: 12, dono: 'Amélia', area: 'Arteterapia'},
    {n: 13, dono: 'Angélica', area: 'Psicologia'},
    {n: 14, dono: 'Cecília', area: 'Arteterapia'},
    {n: 15, dono: 'Jussara', area: 'Fonoaudiologia'},
    {n: 16, dono: 'Mariana', area: 'Terapia Ocupacional'},
    {n: 17, dono: 'Beatriz', area: 'Neurofeedback'},
    {n: 18, dono: 'Angélica', area: 'Arteterapia'},
    {n: 19, dono: 'Vanessa', area: 'Psicomotricidade'},
    {n: 20, dono: 'Cláudia', area: 'Psicologia'},
    {n: 21, dono: 'Cristiane', area: 'Fisioterapia Padovan'},
    {n: 22, dono: 'Sílvia', area: 'Psicopedagogia'},
    {n: 23, dono: 'Amélia', area: 'Neurofeedback'},
    {n: 24, dono: 'Sílvia', area: 'Psicomotricidade'},
    {n: 25, dono: 'Amélia', area: 'Terapia Ocupacional'},
    {n: 26, dono: 'Cristiane', area: 'Neurofeedback'},
    {n: 27, dono: 'Amélia', area: 'Psicologia'},
    {n: 28, dono: 'Vanessa', area: 'Fonoaudiologia'},
    {n: 29, dono: 'Joana', area: 'Fonoaudiologia'},
    {n: 30, dono: 'Angélica', area: 'Psicopedagogia'},
  ]

  public listaHorarios: any = [
    {n: 0, horario: '-'},
    {n: 1, horario: '08:00'},
    {n: 2, horario: '08:50'},
    {n: 3, horario: '09:40'},
    {n: 4, horario: '10:30'},
    {n: 5, horario: '11:20'},
    {n: 6, horario: '12:00'},
    {n: 7, horario: '-'},
    {n: 8, horario: '13:10'},
    {n: 9, horario: '14:00'},
    {n: 10, horario: '14:50'},
    {n: 11, horario: '15:40'},
    {n: 12, horario: '16:30'},
    {n: 13, horario: '17:20'},
    {n: 14, horario: '18:10'},
    {n: 15, horario: '19:00'},
  ]


  @Input()  parametro!: string;
  public dados: any;

constructor(private agendaService: AgendaService,
            private clienteService: ClienteService) {




}
MudarSala(l:number, c:number){

  const periodo = l == 0 ? 'manhã' : 'tarde';
  console.log('Vou alterar o usuário da sala ' + c + ' para o período da ' + periodo)
  this.agendaService.dCliente = '';
  this.agendaService.dHora = this.listaHorarios[this.lin].horario;
  this.agendaService.dSala = this.col;
  this.agendaService.dCliente = this.nCli;
  this.agendaService.setCelA(this.celAtual);
  }

  AltHorario(l:number, c:number){
    const hor = this.listaHorarios[l].horario;
    console.log(this.celAtual)
    console.log('Vou alterar a consulta da sala ' + c + ' no horário ' + hor)
    this.agendaService.dCliente = '';
    this.agendaService.dHora = this.listaHorarios[this.lin].horario;
    this.agendaService.dSala = this.col;
    this.agendaService.dCliente = this.nCli;
    this.agendaService.setCelA(this.celAtual);
    console.log('Em cel-agenda:')
    console.log(this.celAtual)
  }

ngOnInit(){
  // this.subscription = this.agendaService.agendaA$.subscribe(
  //   name => this.agendaA = name
  // );
  this.subscription0 = this.agendaService.ChangesA$.subscribe(
    name => this.nChanges = name
  )
  this.subscription2 = this.agendaService.agendaG$.subscribe(
    name => {
      this.agendaG = name;
      this.ReCarregar(this.BuscaA);
    }

  );
  this.subscription3 = this.agendaService.UnitA$.subscribe(
    name => this.UnitA = name
  );
  this.subscription4 = this.agendaService.BuscaA$.subscribe(
    name => {
      this.BuscaA = name
      this.ReCarregar(this.BuscaA);
    }
  );



}

ReCarregar(x: string){
  const xpar = x.split('%');
  const dia = xpar[0] == '' ? new Date().toISOString().split('T')[0] : xpar[0];
  const unit = parseInt(xpar[1]) == 0 ? this.UnitA : parseInt(xpar[1]);
  this.agendaService.dCliente = '';
  this.agendaService.dHora = '';
  this.agendaService.dSala = 0;
  this.dados = this.parametro.split('%');
  this.lin = parseInt(this.dados[0]);
  this.col = parseInt(this.dados[1]);

  if (this.col == 0){
    this.linha1 = this.listaHorarios[this.lin].horario.substring(0, 15);
    this.c1 = true;
    this.l1 = true;
    }else{
    if(this.lin == 0 || this.lin == 7){
      this.linha1 = this.sala[this.col].dono.length > 18 ? this.sala[this.col].dono.substring(0, 15) + '...' : this.sala[this.col].dono;
      this.linha2 = this.sala[this.col].area.length > 18 ? this.sala[this.col].area.substring(0, 15) + '...' : this.sala[this.col].area;
      this.l1 = true;
    }else{
      this.corDeFundo = 'rgb(255, 255, 255)';
      this.linha2 = '';
      this.linha1 = '';
      for(let i of this.agendaG){
        if(i.sala == this.col &&
            i.unidade == unit &&
            i.horario == this.listaHorarios[this.lin].horario
          ){
            switch  (i.repeticao){
              case 'Sessão_Única':
                this.celAtual.repeticao = 'Sessão única';
                break;
              case 'Semanal':
                this.celAtual.repeticao = 'Semanal';
                break;
              case 'Quinzenal':
                this.celAtual.repeticao = 'Quinzenal';
                break;
              case 'Mensal':
                this.celAtual.repeticao = 'Mensal';
                break;
              case 'Terminar_Repetições':
                this.celAtual.repeticao = 'Cancelar Repetição';
                break;
              default:
                this.celAtual.repeticao = 'Sessão única';
                break;
            }


            this.celAtual.id = i.id ? i.id : 0;
            this.celAtual.dia = i.dia ? i.dia : '';
            this.celAtual.diaDaSemana = i.diaDaSemana ? i.diaDaSemana : '';
            this.celAtual.dtAlt = i.dtAlt ? i.dtAlt : '';
            //this.celAtual.historico = i.historico ? i.historico : '';

            const dHist = i.historico?.split('֍') !== undefined? i.historico?.split('֍') : '';
            if(dHist[1]){
              this.nomeProvisorio = dHist[0];
              i.historico = dHist[1];
            }
            this.celAtual.historico = i.historico ? i.historico : '';
            this.celAtual.horario = i.horario ? i.horario : '';
            this.celAtual.idFuncAlt = i.idFuncAlt ? i.idFuncAlt : 0;
            this.celAtual.obs = i.obs ? i.obs : '';
            //this.celAtual.repeticao = i.repeticao ? i.repeticao : '';
            this.celAtual.sala = i.sala ? i.sala : 0;
            this.celAtual.status = i.status ? i.status : '';
            if(this.celAtual.status == 'Bloqueado'){
              this.linha1 = 'Horário bloqueado'
            }
            this.celAtual.subtitulo = i.subtitulo ? i.subtitulo : '';
            this.celAtual.idCliente = i.idCliente ? i.idCliente : 0;
            if(i.idCliente == 0){
              this.linha1 = this.nomeProvisorio;
              this.nCli = this.nomeProvisorio;
            }else{
              for(let j of this.clienteService.clientes){
                if(j.id == i.idCliente){
                  this.idCli = j.id ? j.id : 0;
                  this.nCli = j.nome;
                  this.linha1 = j.nome.length > 18 ? j.nome.substring(0, 15) + '...' : j.nome
                }
              }
            }
            const Lin2 = i.subtitulo ? i.subtitulo : '';
            this.linha2 = Lin2.length > 18 ? Lin2.substring(0, 15) + '...' : Lin2;
            switch (i.status) {
              case 'Vago':
                this.corDeFundo = 'rgb(255, 255, 255)';
                break;
              case 'Pendente':
                this.corDeFundo = 'rgb(195, 231, 255)';
                break;
              case 'Realizado':
                this.corDeFundo = 'lawngreen';
                break;
              case 'Desmarcado':
                this.corDeFundo = 'rgb(238, 200, 103)';
                break;
              case 'Falta':
                this.corDeFundo = 'rgb(231, 84, 113)';
                break;
              case 'Bloqueado':
                this.corDeFundo = 'silver';
                break;
              default:
                this.corDeFundo = 'rgb(255, 255, 255)';
          }
        }
      }

    }
  }
}

get boxShadow(): string {
    const linha = this.listaHorarios[this.lin].horario.substring(0, 15);
    if (linha === this.agendaService.dHora && this.col === this.agendaService.dSala) {
      return '0 0 10px rgba(0, 0, 0, 0.5)'; // Se as variáveis lin e col forem iguais, aplica o box-shadow
    } else {
      return 'none'; // Caso contrário, remove o box-shadow
    }
  }


    ngOnDestroy(): void {


    }
}
