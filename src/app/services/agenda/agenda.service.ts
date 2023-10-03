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
  public dIdCliente: number = 0;
  public val: boolean = false;



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


   }

   private BuscaA = new BehaviorSubject<string>(this.buscaIni);
   BuscaA$ = this.BuscaA.asObservable();
     setBuscaA(name: string) {
       this.BuscaA.next(name);
     }

     private EtapaA = new BehaviorSubject<number>(0);
     EtapaA$ = this.EtapaA.asObservable();
       setEtapaA(name: number) {
         this.EtapaA.next(name);
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
     getagendaG(): Agenda[] {
      return this.agendaG.value;
    }

     private CelA = new BehaviorSubject<Agenda>(this.Vazia);
     CelA$ = this.CelA.asObservable();
     setCelA(name: Agenda) {
       this.CelA.next(name);
     }

     async BuscaAgenda(dia: string): Promise<boolean> {
      console.log('Chamando getAgenda - Ag.S');
      this.agendas = [];
      const data: Response<Agenda[]> = await this.getAgendaByDate(dia);
      this.agendas = data.dados;
      this.success = data.sucesso;
      const Chng = await this.Dados1();
      console.log('saindo de Chg - dados1');
      //this.setChangesA(Chng);
      this.setagendaG(this.agendas);
      console.log('Em agendaService:');
      console.log(this.agendas);
      return true;
    }


  async Dados1(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const verificarSucesso = () => {
        if (this.success === true) {
          resolve(true);
        } else {
          setTimeout(() => {
            verificarSucesso();
          }, 100);
        }
      };

      verificarSucesso();
    });
  }



  async recarregar(): Promise<boolean> {
    console.log('Entrando em async recarregar (Ag.S)');
    const xdia = this.diaA.value;
    const xUnit = this.UnitA.value;
    const valor = xdia + '%' + xUnit;

    try {
      const buscaConcluida = await this.BuscaAgenda(xdia);

      if (buscaConcluida) {
        this.val = await this.Dados1();
        //this.setBuscaA(valor);
        try {
              const buscaCliConcluida = await this.clienteService.BuscaClientes();

              if (buscaCliConcluida) {
                this.val = await this.Dados1();
                this.setBuscaA(valor);

                return true;
              } else {
                console.error('Busca de agenda não foi concluída com sucesso.');
                return false;
                // Lógica para tratamento de erro, se necessário
              }
            } catch (error) {
              console.error('Erro ao buscar agenda:', error);
              return false;
              // Lógica para tratamento de erro, se necessário
            }
      } else {
        console.error('Busca de agenda não foi concluída com sucesso.');
        return false;
        // Lógica para tratamento de erro, se necessário
      }
    } catch (error) {
      console.error('Erro ao buscar agenda:', error);
      return false;
      // Lógica para tratamento de erro, se necessário
    }

  }

}
