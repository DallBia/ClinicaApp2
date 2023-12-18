import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../models/Clientes';
import { Info } from '../models/Infos';
import { Colaborador } from '../models/Colaboradors';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Response } from '../models/Response';
import { environment } from 'src/environments/environment';
import { TableProntClin } from '../models/Tables/TableProntClin';
import {Tipo} from '../models/Tipo';
import { Valor } from '../models/Valores';
import { TableData } from '../models/Tables/TableData';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedNameSubject = new BehaviorSubject<string>('');
  selectedName$ = this.selectedNameSubject.asObservable();
  setSelectedName(name: string) {
    this.selectedNameSubject.next(name);
  }
  private selectedFichaSubject = new BehaviorSubject<string>('NOVO');
  selectedFicha$ = this.selectedFichaSubject.asObservable();
  setSelectedFicha(name: string) {
    this.selectedFichaSubject.next(name);
  }
  private selectedNascimentoSubject = new BehaviorSubject<string>('');
  selectedNascimento$ = this.selectedNascimentoSubject.asObservable();
    setSelectedNascimento(name: string) {
    this.selectedNascimentoSubject.next(name);
  }

public data: string = "01/01/2000";
  private selectedImageSource = new BehaviorSubject<string | null>(null);

  selectedImage$ = this.selectedImageSource.asObservable();

  setSelectedImage(imageUrl: string): void {
    this.selectedImageSource.next(imageUrl);
  }

public ListaNomesC: Tipo[] = [];
public ClienteAtual: number = 0;
public ProfAtual: number = 0;
public ListaClientes!: Cliente;
public ListaProfs!: Colaborador;
public pagina = '';
public MostraInfo = false;
public texto: string = '';
public xvalor: number | string = 0;
public idTexto: number = 0;
public valid: boolean=false;
public validFiltro = false;
public ListaValores: Valor[] = []
public DataS: TableData[]=[]



//--- variável para ajudar no modal do Prontuário:
public ListaPront: TableProntClin[] = [];

//=============================================


  private selectedRowSource = new BehaviorSubject<any>(null);
    currentSelectedRow = this.selectedRowSource.asObservable();

  changeSelectedRow(row: any) {
        this.selectedRowSource.next(row);
    }


    constructor(private http: HttpClient) {

    }

 private apiurl = `${environment.ApiUrl}`
private ApiValor = `${environment.ApiUrl}/Valor`


  UpdateInfo(info: Info) : Observable<Response<Info>>{
    return this.http.put<Response<Info>>(`${this.apiurl}/Info/Editar` , info);
  }
  GetInfoById(id: number): Observable<Response<Info>> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Response<Info>>(`${this.apiurl}/Info/id`, { params });
  }

  GetValores(): Promise<any> {
    return this.http.get<any>(`${this.apiurl}/Valor`).toPromise();
  }

  createValor(novo: Valor): Observable<Response<Valor[]>>{
    return this.http.post<Response<Valor[]>>(`${this.apiurl}/Valor` , novo);
  }
  updateValor(valor: Valor): Observable<Response<Valor[]>>{
    let url = `${this.ApiValor}/Editar`;
    console.log(url)
    return this.http.put<Response<Valor[]>>( url , valor);
  }







  async BuscaValores(){
    let valor: any;
    let linhaValor: Valor
    try{
      const Valores = await this.GetValores();
      valor = Valores.dados;
      valor.map((item: { valor: number | null; data: string | null; id: number | null; nome: string | null; }) => {

         });
      this.ListaValores = valor
    }
    catch{
      valor = 'nada por enquanto 4';
    }
    console.log(valor)
    return valor;
  }
  delay(time:number) {
    setTimeout(() => {

    }, time);
  }

}
