import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';
import { Colaborador } from 'src/app/models/Colaboradors';
import { environment } from 'src/environments/environment';
import { Response } from '../../models/Response';
import { TableProf } from 'src/app/models/Tables/TableProf';
import { FormacaoService } from '../formacao/formacao.service';
import { Formacao } from 'src/app/models/Formacaos';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  constructor(private http: HttpClient, private formacaoService: FormacaoService) { }
  
  private apiurl = `${environment.ApiUrl}/User`
  public Vazia: TableProf[] = [{
    foto: '',
    ficha: '',
    id: 0,
    nome: '',
    nascimento: '',
    area: '',
    selecionada: false,
    desde: '',
    proxses: '',
    celular: '',
    identidade :'',
    cpf : '',
    endereco : '',
    email : '',
    ativo : false,
    perfil : '',
    formacao : undefined
  }]
  
  pLin: TableProf[] = [];
  dataSource: TableProf[] = [];

  nProf = 1;
  EAtual!: Colaborador[]; // guarda o usuário atual
  nEquipe: number = 0;
  FAtual: any; //guarda a lista de Formações do usuário.
  nFormacao: number = 0;
  nUsr:number = 0;

  nChanges: boolean = false;
  Selecionada: string = '';
  ListaEquipe: any;
  ListaFormacaos: any;
  private control!:any;
  private ctrl1: boolean = false;
  private ctrl2: boolean = false;

  public V: Colaborador[]=[]
  public colaboradorsG: Colaborador[] = [];
  private colaboradors$!: Observable<Colaborador[]>;

  public ProfN: number = 0;

    GetColaboradorbyEmail(Login: string, senha: string): Observable<Response<Colaborador[]>> {
      const body = { Login: Login, Senha: senha };
      const apiurllogin = `${environment.ApiUrl}/User/Email`;
      return this.http.post<Response<Colaborador[]>>(apiurllogin, body);
    }

    GetCol(): Observable<Colaborador[]> {
      return this.GetColaborador().pipe(
        map((data) => {
          const dados = data.dados;
          dados.map((item) => {
            item.dtAdmis !== null ? (item.dtAdmis = new Date(item.dtAdmis!).toLocaleDateString('pt-BR')) : '---';
            item.dtDeslig !== null ? (item.dtDeslig = new Date(item.dtDeslig!).toLocaleDateString('pt-BR')) : '---';
            item.dtNasc !== null ? (item.dtNasc = new Date(item.dtNasc!).toLocaleDateString('pt-BR')) : '---';
          });
          this.colaboradorsG = data.dados;
          this.colaboradorsG.sort((a, b) => a.nome.localeCompare(b.nome));

          return this.colaboradorsG; // Retorna o array
        }),
        switchMap((colaboradores) => of(colaboradores)) // Converte o array em um observable
      );
    }





    GetColaborador(): Observable<Response<Colaborador[]>> {
      const apiurllogin = `${environment.ApiUrl}/User`;
      return this.http.get<Response<Colaborador[]>>(apiurllogin);
    }



    CreateColaborador(prof: Colaborador) : Observable<Response<Colaborador[]>>{
      const apiurllogin = `${environment.ApiUrl}/User`;
      return this.http.post<Response<Colaborador[]>>(apiurllogin , prof);
    }
    UpdateColaborador(prof: Colaborador) : Observable<Response<Colaborador[]>>{
      const apiurllogin = `${environment.ApiUrl}/User/Editar`;
      return this.http.put<Response<Colaborador[]>>(apiurllogin , prof);
    }


    GetEquipe() : Observable<Response<Colaborador[]>>{
      return this.http.get<Response<Colaborador[]>>(this.apiurl);
    }
    CreateEquipe(Equipe: Colaborador) : Observable<Response<Colaborador[]>>{
      return this.http.post<Response<Colaborador[]>>(`${this.apiurl}/Novo` , Equipe);
    }
    UpdateEquipe(Equipe: Colaborador) : Observable<Response<Colaborador[]>>{
      return this.http.put<Response<Colaborador[]>>(`${this.apiurl}/Editar` , Equipe);
    }

    private EquipeAtual = new BehaviorSubject<Colaborador>(this.V[0]);
    EquipeAtual$ = this.EquipeAtual.asObservable();
    setEquipeAtual(name: Colaborador) {
      this.EquipeAtual.next(name);
    }

    private EquipeA = new BehaviorSubject<number>(0);
    EquipeA$ = this.EquipeA.asObservable();
    setEquipeA(name: number) {
      this.EquipeA.next(name);
    }

    private ProfAtual = new BehaviorSubject<TableProf>(this.Vazia[0]);
    ProfAtual$ = this.ProfAtual.asObservable();
    setProfAtual(name: TableProf) {
      const currentProf = this.ProfAtual.getValue();
      currentProf.foto = name.foto;
      currentProf.ficha = name.ficha;
      currentProf.id = name.id;
      currentProf.nome = name.nome;
      currentProf.nascimento = name.nascimento;
      currentProf.area = name.area;
      currentProf.selecionada = name.selecionada;
      currentProf.desde = name.desde;
      currentProf.proxses = name.proxses;
      currentProf.celular = name.celular;
      currentProf.identidade = name.identidade;
      currentProf.cpf = name.cpf;
      currentProf.endereco = name.endereco;
      currentProf.email = name.email;
      currentProf.ativo = name.ativo;
      currentProf.perfil = name.perfil;
      currentProf.formacao = name.formacao;
    
      this.ProfAtual.next(currentProf);
    }





    private ProfA = new BehaviorSubject<number>(0);
    ProfA$ = this.ProfA.asObservable();
    setProfA(name: number) {
      this.ProfA.next(name);
    }

    private ChangesA = new BehaviorSubject<boolean>(false);
    ChangesA$ = this.ChangesA.asObservable();
    setChangesA(name: boolean) {
      this.ChangesA.next(name);
    }


inicio(){
    this.GetCol().subscribe((data) => {
      this.control = data;
      this.ctrl1 = this.Dados2();
     });

       this.formacaoService.GetFormacao().subscribe(data => {
         this.formacaoService.formacaos = data.dados;
         this.ctrl2 = this.Dados1();
     });
     this.Dados3();
}
    Dados1(): boolean {
      if (!this.formacaoService.formacaos) {
        setTimeout(() => {
          this.Dados1();
        }, 300);
      } else {
        return true;
      }
      return true;
    }


    Dados2(): boolean {
      if (!this.control) {
        setTimeout(() => {
          this.Dados2();
        }, 300);
      } else {
        return true;
      }
      return true;
    }


    Dados3() {
      if (this.ctrl1 === true && this.ctrl2 === true) {
        this.Carregar();
      } else {
        setTimeout(() => {
          this.Dados3();
        }, 300);
      }
    }




    Carregar(){
      for (let i of this.colaboradorsG){
        let tipo = '';
        switch (i.idPerfil) {
          case 0:
            tipo = 'Diretoria';
            break;
          case 1:
            tipo = 'Secretaria';
            break;
          case 2:
            tipo = 'Coordenação'
            break;
          default:
            tipo = 'Equipe Clínica'
            break;
        }
        let pForm: Formacao[] = [];
        for (const forma of this.formacaoService.formacaos) {
          let x = forma.idFuncionario;
          if (forma.idFuncionario == i.id) {
            pForm.push(forma);
          }
        }
        this.pLin = [{
          foto:'(img)',
          ficha: i.id !== undefined ? i.id.toString().padStart(4, '0') : '0',
          id: i.id,
          nome: i.nome,
          nascimento: i.dtNasc,
          area: i.areaSession !== undefined ? i.areaSession : '-',
          selecionada: false,
          desde: i.dtAdmis,
          proxses: '',
          celular: i.celular + " | " + i.telFixo,
          identidade: i.rg,
          cpf : i.cpf,
          endereco : i.endereco,
          email : i.email,
          ativo : i.ativo,
          perfil : tipo,
          formacao :pForm,
        }]
        this.dataSource = [...this.dataSource, ... this.pLin]
      }
    }

}
