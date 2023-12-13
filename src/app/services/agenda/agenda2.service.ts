import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../models/Response';
import { TableData } from 'src/app/models/Tables/TableData';
import { ClienteService } from '../cliente/cliente.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { DonoSalaService } from '../donoSala/dono-sala.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Tipo } from 'src/app/models/Tipo';
import { TableAgenda } from 'src/app/models/Tables/TableAgenda';
import { Table } from 'docx';
import { Cliente } from 'src/app/models/Clientes';
import { FileService } from '../foto-service.service';
import { Valor}from 'src/app/models/Valores';
import { Colaborador } from 'src/app/models/Colaboradors';



@Injectable({
  providedIn: 'root'
})
export class Agenda2Service {
  private _agendaDiaSubject = new BehaviorSubject<any[]>([]);
  agendaDia$ = this._agendaDiaSubject.asObservable();
  atualizarChanges(bol: boolean) {
    this._changes.next(bol);
  }
  private _changes = new BehaviorSubject<boolean>(false);
  changes$ = this._changes.asObservable();

  atualizarAgendaDia(novaAgendaDia: any[]) {
    this._agendaDiaSubject.next(novaAgendaDia);
  }


  public Vazia: Agenda = {
    id: 0,
    idCliente:0,
    nome:'',
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
    valor: -1000009,
  };
  public tVazia: Tipo = {
    id: 0,
    nome: '',
  }
  private aVazia: Agenda[] = [];

  public dia: string = new Date().toISOString().split('T')[0];
  public un: number = 1;
  public sala: number = 0;
  public hora: number = 0;
  public horario: string = '';
  public celSelect: Agenda = this.Vazia;
  public cellA: Agenda = this.Vazia;
  public agendaDia: TableAgenda[] = [];
  public agendaDiaAnt: TableAgenda[] = [];
  public linTmp: TableAgenda[] = [];
  public dHora: number = 0;
  public dSala: number = 0;
  public agendaG: Agenda[] = [];
  public agendaCriada!: Agenda
  public buscaConcluida: boolean = false;
  public ListaCLientes: Tipo[] = [];
  public ListaEquipe: Tipo[] = [];
  public ListaValores: Valor[] = [];
  public Cliente!: Cliente;
  public Equipe!: Colaborador;
  public fotografia: boolean = false;
  public changes: boolean = false;
  public success: boolean = false;

  public listaHorarios: any = [
    {n: 0, horario: 'manhã'},
    {n: 1, horario: '08:00'},
    {n: 2, horario: '08:50'},
    {n: 3, horario: '09:40'},
    {n: 4, horario: '10:30'},
    {n: 5, horario: '11:20'},
    {n: 6, horario: '12:00'},
    {n: 7, horario: 'tarde'},
    {n: 8, horario: '13:10'},
    {n: 9, horario: '14:00'},
    {n: 10, horario: '14:50'},
    {n: 11, horario: '15:40'},
    {n: 12, horario: '16:30'},
    {n: 13, horario: '17:20'},
    {n: 14, horario: '18:10'},
    {n: 15, horario: '19:00'},
  ]




  constructor(private http: HttpClient,
    private clienteService: ClienteService,
    private colaboradorService: ColaboradorService,
    private donoSalaService: DonoSalaService,
    public fotoService: FileService,
    private shared: SharedService) { }


  recarregar(){
    this.BuscaAgenda(this.dia)
  }

  private apiUrl = `${environment.ApiUrl}/Agenda`;
  getAgendaByDate(date: string): Promise<Response<Agenda[]>> {
  return this.http.get<Response<Agenda[]>>(`${this.apiUrl}/AgendaByDate/${date}`)
    .toPromise()
    .then(response => {
      if (response) {
        return response;
      } else {
        throw new Error('Resposta da API é indefinida.');
      }
    })
    .catch(error => {
      throw error; // Você pode personalizar essa parte conforme sua necessidade
    });
  }

  async BuscaAgenda(dia: string): Promise<boolean> {
    this.Cliente = this.clienteService.clienteVazio
    this.Equipe = this.colaboradorService.equipeVazia
    this.celSelect = this.Vazia;
    this.agendaDia = [];
    const data: Response<Agenda[]> = await this.getAgendaByDate(dia);

    this.agendaG = data.dados;
    setTimeout(() => {
    }, 300);
    for (let i of this.agendaG){
      if(i.unidade == this.un){
        const ntmp = this.listaHorarios.find((item: { horario: string | undefined; }) => item.horario === i.horario);
        const n = ntmp.n !== undefined ? ntmp.n  * 100: 0;
        const s = i.sala !== undefined ? i.sala : 0;
        const idTemp = n + s;
        this.linTmp = [{
          id: i.id,
          idCliente:  i.idCliente,
          nome:  i.nome,
          idFuncAlt:  i.idFuncAlt,
          dtAlt:  i.dtAlt,
          horario:  i.horario,
          sala:  i.sala,
          unidade:  i.unidade,
          dia:  i.dia,
          diaDaSemana:  i.diaDaSemana,
          repeticao:  i.repeticao,
          subtitulo:  i.subtitulo,
          status:  i.status,
          historico:  i.historico,
          obs:  i.obs,
          valor:  i.valor,
          idtmp: idTemp
        }]
        this.agendaDia = [...this.agendaDia, ...this.linTmp]
      }
    }
    this.agendaDiaAnt = this.agendaDia;
    this.atualizarAgendaDia(this.agendaDia)

    return true;
  }

  GetClientesByAgenda(): Promise<any> {
    return this.http.get<any>(`${environment.ApiUrl}/Cliente/Agenda`).toPromise();
  }
  async BuscaClientes(){
    const data = await this.GetClientesByAgenda();
    this.ListaCLientes = data.dados
  }
  GetColabByAgenda(): Promise<any> {
    return this.http.get<any>(`${environment.ApiUrl}/Colaborador/Agenda`).toPromise();
  }
  async BuscaColab(){
    const data = await this.GetColabByAgenda();
    this.ListaEquipe = data.dados
  }

  async BuscarAgenda(dia: string): Promise<boolean> {
    this.Cliente = this.clienteService.clienteVazio
    this.Equipe = this.colaboradorService.equipeVazia
    this.celSelect = this.Vazia;
    this.agendaDia = [];
    const data: Response<Agenda[]> = await this.getAgendaByDate(dia);

    this.agendaG = data.dados;
    this.success = true
    return true;
  }


  async BuscaColabor(id: number){
    let data: any;
    try{
      const data = await this.colaboradorService.GetColaboradorbyId(id)
      this.Equipe = data.dados
      console.log(this.Equipe)
    }
    catch{

    }
    return true

  }



    async BuscaValores(){
      let data = 'nada por enquanto 2'
      try{
        data = await this.shared.BuscaValores();
      }
      catch{

      }
      return data;
    }



    async BuscaCliente(id: number){
      const data = await this.clienteService.BuscaClientesById(id)
      if(data){
        this.Cliente = this.clienteService.cliente
      }
    }


    // CreateAgenda(agenda: Agenda) : Observable<Response<Agenda[]>>{
    //   return this.http.post<Response<Agenda[]>>(`${this.apiUrl}/CreateAgenda` , agenda);
    // }
    // UpdateAgenda(id: number, agenda: Agenda) : Observable<Response<Agenda[]>>{
    //   return this.http.put<Response<Agenda[]>>(`${this.apiUrl}/UpdateAgenda/${id}` , agenda);
    // }

    async UpdateAgenda(id: number, agenda: Agenda): Promise<Agenda[]> {
      try {
        const response = await this.http.put<Response<Agenda[]>>(`${this.apiUrl}/UpdateAgenda/${id}` , agenda).toPromise();

        if (response && response.dados !== undefined && response.sucesso) {
          return response.dados;
        } else {
          throw new Error('Resposta da API é indefinida, não contém dados ou não é bem-sucedida.');
        }
      } catch (error) {
        throw error; // Você pode personalizar essa parte conforme sua necessidade
      }
    }
    async CreateAgenda(agenda: Agenda): Promise<Agenda[]> {
      try {
        const response = await this.http.post<Response<Agenda[]>>(`${this.apiUrl}/CreateAgenda` , agenda).toPromise();
        if (response && response.dados !== undefined && response.sucesso) {
          this.agendaG = response.dados;
          return response.dados;
        } else {
          throw new Error('Resposta da API é indefinida, não contém dados ou não é bem-sucedida.');
        }
      } catch (error) {
        throw error; // Você pode personalizar essa parte conforme sua necessidade
      }
    }










  carregarCel(){

    this.Cliente = this.clienteService.clienteVazio
    this.celSelect = this.Vazia;

    const s = this.hora * 100;
    const idSelect = s + this.sala;

    for(let i of this.agendaDia){
      if (i.idtmp == idSelect){
        this.celSelect ={
          id: i.id,
          idCliente:  i.idCliente,
          nome:  i.nome,
          idFuncAlt:  i.idFuncAlt,
          dtAlt:  i.dtAlt,
          horario:  i.horario,
          sala:  i.sala,
          unidade:  i.unidade,
          dia:  i.dia,
          diaDaSemana:  i.diaDaSemana,
          repeticao:  i.repeticao,
          subtitulo:  i.subtitulo,
          status:  i.status,
          historico:  i.historico,
          obs:  i.obs,
          valor:  i.valor,
        }
      }
      this.cellA = this.celSelect;
    }

    this.celSelect.idCliente = this.celSelect.idCliente !== undefined ? this.celSelect.idCliente : 0;
    if (this.celSelect.id == 0){
      let data: any = 'nada por enquanto';
      // try{
      //   data = this.BuscaValores();
      // }catch{
      //   data = null;
      // }
      this.ListaValores = data.value;
      console.log(this.ListaValores)
    }
    if (this.celSelect.idCliente !== 0){
      const data = this.BuscaCliente(this.celSelect.idCliente)
      this.Cliente.foto = this.Cliente.foto !== '' ? this.Cliente.foto : this.fotoService.semfoto2

    }
    this.celSelect.id = this.celSelect.id !== undefined ? this.celSelect.id : 0;
    this.Cliente.foto = this.Cliente.foto !== '' ? this.Cliente.foto : this.fotoService.semfoto2
    this.fotografia = true
    for(let i of this.listaHorarios){
      if (i.n == this.hora){
        this.horario = i.horario
      }
    }

  }

  carregarSala(){
    this.Equipe = this.colaboradorService.equipeVazia
    this.celSelect = this.Vazia;

    const s = this.hora * 100;
    const idSelect = s + this.sala;
    for(let i of this.agendaDia){
      if (i.idtmp == idSelect){
        this.celSelect ={
          id: i.id,
          idCliente:  i.idCliente,
          nome:  i.nome,
          idFuncAlt:  i.idFuncAlt,
          dtAlt:  i.dtAlt,
          horario:  i.horario,
          sala:  i.sala,
          unidade:  i.unidade,
          dia:  i.dia,
          diaDaSemana:  i.diaDaSemana,
          repeticao:  i.repeticao,
          subtitulo:  i.subtitulo,
          status:  "Sala",
          historico:  i.historico,
          obs:  i.obs,
          valor:  0,
        }
        this.cellA = this.celSelect
      }
    }

    this.celSelect.idCliente = this.celSelect.idCliente !== undefined ? this.celSelect.idCliente : 0;
    // if (this.celSelect.id == 0){
    //   // let data: any = 'nada por enquanto';
    //   // try{
    //   //   data = this.BuscaValores();
    //   // }catch{
    //   //   data = null;
    //   // }
    //   // this.ListaValores = data.value;
    //   // console.log(this.ListaValores)
    // }
    if (this.celSelect.idCliente !== 0){
      const data = this.BuscaColabor(this.celSelect.idCliente)
      this.Equipe.foto = this.Equipe.foto !== '' ? this.Equipe.foto : this.fotoService.semfoto2

    }
    this.celSelect.id = this.celSelect.id !== undefined ? this.celSelect.id : 0;
    const fotoUnd = this.Equipe !== undefined ? this.Equipe.foto : this.fotoService.semfoto2
    this.Equipe.foto = fotoUnd !== '' ? fotoUnd : this.fotoService.semfoto2
    this.fotografia = true
    for(let i of this.listaHorarios){
      if (i.n == this.hora){
        this.horario = i.horario
      }
    }
    console.log(this.celSelect)
    console.log(this.Equipe)

  }

}
