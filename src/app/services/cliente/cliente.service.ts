import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  public caminho: string = '';
  dataSource: TableData[] = [];
  public nLin: TableData[] = [];
  public Verifica: boolean = false;
  subscription!: Subscription;
  nChanges!: boolean;


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

  public success: boolean = false;
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

  // GetClienteById(id: number) : Observable<Response<Cliente>>{
  //   return this.http.get<Response<Cliente>>(`${this.apiurl}/id`, id);
  // }


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

  BuscaClientes(){

    this.clientes = [];
    this.clientesG = [];

    this.GetClientes().subscribe(data => {
      const dados = data.dados;
      dados.map((item) => {
        item.clienteDesde !== null ? item.clienteDesde = new Date(item.clienteDesde!).toLocaleDateString('pt-BR') : '---'
        item.dtInclusao !== null ? item.dtInclusao = new Date(item.dtInclusao!).toLocaleDateString('pt-BR') : '---'
        item.dtNascim !== null ? item.dtNascim = new Date(item.dtNascim!).toLocaleDateString('pt-BR') : '---'
      })

      this.clientesG = data.dados;
      this.clientesG.sort((a, b) => a.nome.localeCompare(b.nome));
      this.clientes = data.dados;
      this.success = data.sucesso;
      this.success = this.Dados1();
      console.log('Sucesso? ' + this.success)
      this.Carregar();
    });
  }

  Dados1(): boolean {
    if (this.success !== true) {
      setTimeout(() => {
        this.Dados1();
      }, 300);
    } else {
      return true;
    }
    return true;
  }


  async Carregar(){

    console.log('Entrando em Carregar... ')
    console.log(this.clientes)
    this.dataSource = [];
    for (let i of this.clientesG) {
      // let aCelular: string = '---';
      // let aComercial: string = '---';
      // let aFixo: string = '---';
      let aSaiS: string = 'Não';
      let aRestM: string = 'Não';
      let aRestP: string = 'Não';

      if(i.id !== undefined){

        if(i.maeRestric === true){
          aRestM = 'Sim';
        }
        if(i.paiRestric === true){
          aRestP = 'Sim';
        }
        if(i.saiSozinho === true){
          aSaiS = 'Sim';
        }
        const aId: string = i.id.toString().padStart(4, '0');
        const aIdade1 = this.converterParaDate(i.dtNascim);
        const aIdade: string = this.calcularIdade(aIdade1) + ' anos';
        this.caminho = '../../assets/img/Clientes/' + aId + '.jpg';
        const imagemValida = await this.verificarImagem(this.caminho);
        //// console.log('imagem ' + this.Verifica)
          if (imagemValida !== true) {
            this.caminho = '../../assets/img/Clientes/0000.jpg';
        }
        this.nLin =[{Foto: this.caminho,
          Ficha: aId,
          id: i.id,
          nome: i.nome,
          saiSozinho: aSaiS,
          dtNascim: i.dtNascim,
          areaSession: i.areaSession,
          telFixo: i.telFixo,
          celular: i.celular,
          selecionada: false,
          Idade:aIdade,
          clienteDesde:i.clienteDesde,
          dtInclusao: i.dtInclusao,
          respFinanc: i.respFinanc,
          endereco: i.endereco,
          email: i.email,
          identidade: i.identidade,
          ativo: i.ativo,
          cpf: i.cpf,
          telComercial: i.telComercial,

          mae: i.mae,
          maeIdentidade:i.maeIdentidade,
          maeCpf:i.maeCpf,
          maeRestric: aRestM,
          maeCelular: i.maeCelular,
          maeTelFixo:i.maeTelFixo,
          maeTelComercial: i.maeTelComercial,
          maeEmail: i.maeEmail,
          maeEndereco: i.maeEndereco,

          pai: i.pai,
          paiIdentidade:i.paiIdentidade,
          paiCpf:i.paiCpf,
          paiRestric: aRestP,
          paiCelular: i.paiCelular,
          paiTelFixo:i.paiTelFixo,
          paiTelComercial: i.paiTelComercial,
          paiEmail: i.paiEmail,
          paiEndereco: i.paiEndereco,
        }];
        this.dataSource = [...this.dataSource, ...this.nLin]
      }
    }
  }

  converterParaDate(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  calcularIdade(dataNascimento: Date): string {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    // Ajuste para caso o aniversário ainda não tenha ocorrido este ano
    const m = hoje.getMonth() - dataNascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    return idade.toString();
  }
  verificarImagem(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}
