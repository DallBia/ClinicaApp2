import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/models/Clientes';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';
import { BehaviorSubject } from 'rxjs';
import { TableData } from 'src/app/models/Tables/TableData';
import { TabResult } from 'src/app/models/Tables/TabResult';

@Injectable({
  providedIn: 'root'
})


export class ClienteService {
  public Vazia: TableData[] = [{
  Foto: '(img)',
  Ficha: '',
  selecionada: false,
  Proxses:  '',

  id: 0,
  nome:  '',
  dtNascim:  '',
  saiSozinho:  'Sim',
  ativo : true,
  areaSession:  '',
  clienteDesde:  '',
  Idade: '',
  dtInclusao :  '',
  respFinanc :  '',
  identidade :  '',
  cpf:  '',
  endereco :  '',
  email :  '',
  telFixo: '',
  celular: '',
  telComercial: '',

  mae : '',
  maeRestric : 'Não',
  maeIdentidade : '',
  maeCpf: '',
  maeEndereco : '',
  maeEmail : '',
  maeTelFixo: '',
  maeCelular: '',
  maeTelComercial: '',

  pai : '',
  paiRestric : 'Não',
  paiIdentidade : '',
  paiCpf: '',
  paiEndereco : '',
  paiEmail : '',
  paiTelFixo: '',
  paiCelular: '',
  paiTelComercial: '',

    }];

  constructor(private http: HttpClient) { }

  public clientes: Cliente[] = [];
  public clientesG: Cliente[] = [];
  // public ClienteAtual: Cliente[] = [];
  // public ClienteN: number = 0;

 private apiurl = `${environment.ApiUrl}/Cliente`
  GetClientes() : Observable<Response<Cliente[]>>{
    return this.http.get<Response<Cliente[]>>(this.apiurl);
  }
  CreateCliente(cliente: Cliente) : Observable<Response<Cliente[]>>{
    return this.http.post<Response<Cliente[]>>(`${this.apiurl}` , cliente);
  }
  UpdateCliente(cliente: Cliente) : Observable<Response<Cliente[]>>{
    return this.http.put<Response<Cliente[]>>(`${this.apiurl}/Editar` , cliente);
  }

  private ClienteAtual = new BehaviorSubject<TableData>(this.Vazia[0]);
  ClienteAtual$ = this.ClienteAtual.asObservable();
  setClienteAtual(name: TableData) {
    // console.log('ClienteAtual ANTES')
    // console.log(this.ClienteAtual)
    this.ClienteAtual.next(name);
    // console.log('ClienteAtual ANTES')
    // console.log(this.ClienteAtual)
    // console.log('name (TableData)')
    // console.log(name)
  }

  private ClienteA = new BehaviorSubject<number>(0);
  ClienteA$ = this.ClienteA.asObservable();
  setClienteA(name: number) {
    this.ClienteA.next(name);
  }

  private ChangesA = new BehaviorSubject<boolean>(false);
  ChangesA$ = this.ChangesA.asObservable();
  setChangesA(name: boolean) {
    this.ChangesA.next(name);
  }


  ngOnInit(){

  }

}
