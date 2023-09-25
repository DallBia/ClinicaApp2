import { Response } from '../../models/Response';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formacao } from 'src/app/models/Formacaos';

@Injectable({
  providedIn: 'root'
})
export class FormacaoService {
public formacaos: Formacao[] = [];
public Vazia: Formacao[] = [{
  id: 0,
  idFuncionario: 0,
  dtConclusao: '',
  nivel:'',
  registro: '',
  instituicao: '',
  nomeFormacao: '',
  areasRelacionadas: '',
}]



  constructor(private http: HttpClient) { }


  private apiurl = `${environment.ApiUrl}/Formacao`
  GetFormacao() : Observable<Response<Formacao[]>>{
    return this.http.get<Response<Formacao[]>>(this.apiurl);
  }

  CreateFormacao(formacao: Formacao) : Observable<Response<Formacao[]>>{
    return this.http.post<Response<Formacao[]>>(`${this.apiurl}`, formacao);
  }
  
  UpdateFormacao(formacao: Formacao) : Observable<Response<Formacao[]>>{
    return this.http.put<Response<Formacao[]>>(`${this.apiurl}/Editar` , formacao);
  }

  private FormacaoAtual = new BehaviorSubject<Formacao>(this.Vazia[0]);
  FormacaoAtual$ = this.FormacaoAtual.asObservable();
  setFormacaoAtual(name: Formacao) {
    this.FormacaoAtual.next(name);
  }

  private FormacaoA = new BehaviorSubject<number>(0);
  FormacaoA$ = this.FormacaoA.asObservable();
  setFormacaoA(name: number) {
    this.FormacaoA.next(name);
  }

}
