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
public idTexto: number = 0;
public valid: boolean=false;
public validFiltro = false;

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

 private apiurl = `${environment.ApiUrl}/Info`



  UpdateInfo(info: Info) : Observable<Response<Info>>{
    return this.http.put<Response<Info>>(`${this.apiurl}/Editar` , info);
  }
  GetInfoById(id: number): Observable<Response<Info>> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Response<Info>>(`${this.apiurl}/id`, { params });
  }




}
