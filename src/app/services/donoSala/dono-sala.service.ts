import { DonoSala } from './../../models/DonoSalas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { AgendaService } from '../agenda/agenda.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';


@Injectable({
  providedIn: 'root'
})




export class DonoSalaService {

private donoV: DonoSala[] = []
private donoA: DonoSala = {
  id: 0,
  unidade: 0,
  sala: 0,
  idProfissional: 0,
  area: '',
  diaSemana: '',
  dataInicio: new Date().toISOString().split('T')[0],
  dataFim: undefined,
  periodo: '',
}
private success: boolean = false;


public dono!: DonoSala[];

  constructor(private http: HttpClient,) {}

  async BuscaDonos(){

    this.dono = [];
    // this.nVezes += 1;
    // console.log('Em clienteService: ' + this.nVezes)
      try {
        const data = await this.GetDonos();

        const dados = data.dados;
        dados.map((item: DonoSala) => {
          item.dataInicio !== null ? item.dataInicio = new Date(item.dataInicio!).toLocaleDateString('pt-BR') : '---'
          item.dataFim !== null ? item.dataFim = new Date(item.dataFim!).toLocaleDateString('pt-BR') : '---'
          });

        this.dono = data.dados;
        this.dono.sort((a, b) => a.dataInicio.localeCompare(b.dataInicio));
        this.setDonoAtual(data.dados);
        this.success = data.sucesso;

        return true;
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return false;
      }
    }


    private apiurl = `${environment.ApiUrl}/DonoSala`
    GetDonos(): Promise<any> {
     return this.http.get<any>(`${this.apiurl}`).toPromise();
   }
     CreateCliente(dono: DonoSala) : Observable<Response<DonoSala[]>>{
       return this.http.post<Response<DonoSala[]>>(`${this.apiurl}` , dono);
     }
     UpdateCliente(dono: DonoSala) : Observable<Response<DonoSala[]>>{
       return this.http.put<Response<DonoSala[]>>(`${this.apiurl}/Editar` , dono);
     }

     private Dono = new BehaviorSubject<DonoSala[]>(this.donoV);
     Dono$ = this.Dono.asObservable();
     setDonoAtual(dono: DonoSala[]) {
       this.Dono.next(dono);
     }
     getDonoAtual() {
      return this.Dono.value;
    }

}
