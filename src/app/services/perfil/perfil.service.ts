import { Perfil } from './../../models/Perfils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';
import { BehaviorSubject } from 'rxjs';
import { TableData } from 'src/app/models/Tables/TableData';
import { TabResult } from 'src/app/models/Tables/TabResult';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  public Vazia: Perfil[] = [{
  id: 0,
  descricao: '',
  help: '',
  dir: false,
  secr: false,
  coord: false,
  equipe: false,
  siMesmo: false
    }];
  constructor(private http: HttpClient) { }


    public perfils: Perfil[] = [];
    private apiurl = `${environment.ApiUrl}/Perfil`


    GetPerfil() : Observable<Response<Perfil[]>>{
      return this.http.get<Response<Perfil[]>>(this.apiurl);
    }

    UpdatePerfil(perfil: Perfil) : Observable<Response<Perfil[]>>{
      return this.http.put<Response<Perfil[]>>(`${this.apiurl}/Editar`, perfil);
    }

    private PerfilAtual = new BehaviorSubject<Perfil>(this.Vazia[0]);
    PerfilAtual$ = this.PerfilAtual.asObservable();
  setPerfilAtual(name: Perfil) {
    this.PerfilAtual.next(name);
  }
    private Ajuda = new BehaviorSubject<string>('');
    Ajuda$ = this.Ajuda.asObservable();
  setAjuda(name: string) {
    this.Ajuda.next(name);
}
}
