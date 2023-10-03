import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../models/Response';
import { TableData } from 'src/app/models/Tables/TableData';
import { ClienteService } from '../cliente/cliente.service';



@Injectable({
  providedIn: 'root'
})
export class AgendaService {
public Horarios = [
  {hora: 0, texto:'-', cor: 'Rosa'},
  {hora: 1, texto:'08:00', cor: 'Branco'},
  {hora: 2, texto:'08:50', cor: 'Branco'},
  {hora: 3, texto:'09:40', cor: 'Branco'},
  {hora: 4, texto:'10:30', cor: 'Branco'},
  {hora: 5, texto:'11:20', cor: 'Branco'},
  {hora: 6, texto:'12:10', cor: 'Branco'},
  {hora: 7, texto:'-', cor: 'Rosa'},
  {hora: 8, texto:'13:10', cor: 'Branco'},
  {hora: 9, texto:'14:00', cor: 'Branco'},
  {hora: 10, texto:'14:50', cor: 'Branco'},
  {hora: 11, texto:'15:40', cor: 'Branco'},
  {hora: 12, texto:'16:30', cor: 'Branco'},
  {hora: 13, texto:'17:20', cor: 'Branco'},
  {hora: 14, texto:'18:10', cor: 'Branco'},
  {hora: 15, texto:'19:00', cor: 'Branco'}
];

  public ctrl2: boolean = false;
  public agendas: Agenda[] = [];
  public Vazia: Agenda = {};
  public diaAtual: string = new Date().toISOString().split('T')[0];
  public buscaIni: string = new Date().toISOString().split('T')[0] + '%1';
  public success: boolean = false;
  public dSala: number = 0;
  public dHora: string = '';
  public dCliente: string = '';
  public val: boolean = false;



private apiUrl = `${environment.ApiUrl}/Agenda`;

getAgendaByDate(date: string): Observable<Response<Agenda[]>> {
  return this.http.get<Response<Agenda[]>>(`${this.apiUrl}/AgendaByDate/${date}`);
}

CreateAgenda(agenda: Agenda) : Observable<Response<Agenda[]>>{
  return this.http.post<Response<Agenda[]>>(`${this.apiUrl}/CreateAgenda` , agenda);
}
UpdateAgenda(id: number, agenda: Agenda) : Observable<Response<Agenda[]>>{
  return this.http.put<Response<Agenda[]>>(`${this.apiUrl}/UpdateAgenda/${id}` , agenda);
}

// UpdateAgenda(id: number, agenda: Agenda) : Observable<Response<Agenda[]>>{
//   return this.http.put<Response<Agenda[]>>(`${this.apiUrl}/UpdateAgenda/${id}` , agenda);
// }
  constructor(private http: HttpClient,
              private clienteService: ClienteService) {
    this.recarregar(this.diaAtual,1)
   }


   BuscaAgenda(dia: string){
    console.log('Chamando getAgenda - Ag.S')
    this.agendas = [];
    this.getAgendaByDate(dia).subscribe(async data => {
      this.agendas = data.dados;
      setTimeout(() => {

      }, 300);
      this.success = data.sucesso;
      const Chng = await this.Dados1();
      console.log('saindo de Chg - dados1')
      this.setChangesA(Chng);
      this.setagendaG(this.agendas)
      console.log('Em agendaService:')
      console.log(this.agendas)
    });
  }


  async Dados1(): Promise<boolean> {
    console.log('Entrando em Dados1 - agenda.s')
    return new Promise<boolean>((resolve) => {
      const verificarSucesso = () => {
        if (this.success === true) {
          resolve(true);
        } else {
          setTimeout(() => {
            verificarSucesso();
          }, 300);
        }
      };

      verificarSucesso();
    });
  }
  // async main() {
  //   const resultado = await this.Dados1();
  //   console.log('Saindo do Dados1');
  //   console.log(resultado); // true se sucesso, false caso contrário
  // }



  async recarregar(dia: string, unit: number){
    console.log('Entrando em async recarregar (Ag.S)')
  const xdia = dia == '' ? this.diaA.value : dia;
  const xUnit = unit == 0 ? this.UnitA.value : unit;
  const valor = xdia + '%' + xUnit;
  this.BuscaAgenda(xdia);
  this.val = await this.Dados1();
  this.setBuscaA(valor);
}



private BuscaA = new BehaviorSubject<string>(this.buscaIni);
BuscaA$ = this.BuscaA.asObservable();
  setBuscaA(name: string) {
    this.BuscaA.next(name);
  }

  private ChangesA = new BehaviorSubject<boolean>(false);
  ChangesA$ = this.ChangesA.asObservable();
  setChangesA(name: boolean) {
    this.ChangesA.next(name);
  }

  // private agendaA = new BehaviorSubject<Agenda>(this.Vazia);
  // agendaA$ = this.agendaA.asObservable();
  // setAgendaAtual(name: Agenda) {
  //   this.agendaA.next(name);
  // }
  private UnitA = new BehaviorSubject<number>(1);
  UnitA$ = this.UnitA.asObservable();
    setUnitAtual(name: number) {
      this.UnitA.next(name);
    }
    private diaA = new BehaviorSubject<string>(this.diaAtual);
    diaA$ = this.diaA.asObservable();
      setDiaAtual(name: string) {
        this.diaA.next(name);
      }

  private agendaG = new BehaviorSubject<Agenda[]>([]);
  agendaG$ = this.agendaG.asObservable();
  setagendaG(name: Agenda[]) {
    this.agendaG.next(name);
  }

  private CelA = new BehaviorSubject<Agenda>(this.Vazia);
  CelA$ = this.CelA.asObservable();
  setCelA(name: Agenda) {
    this.CelA.next(name);
  }
}
