import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Agenda } from 'src/app/models/Agendas';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../models/Response';
import { ClienteService } from '../cliente/cliente.service';
import { ColaboradorService } from '../colaborador/colaborador.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Tipo } from 'src/app/models/Tipo';
import { TableAgenda } from 'src/app/models/Tables/TableAgenda';
import { Cliente } from 'src/app/models/Clientes';
import { FileService } from '../foto-service.service';
import { Valor}from 'src/app/models/Valores';
import { Colaborador } from 'src/app/models/Colaboradors';
// import { DonoSala } from 'src/app/models/DonoSalas';



@Injectable({
  providedIn: 'root'
})
export class Agenda2Service {
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

  private _agendaDiaSubject = new BehaviorSubject<any[]>([]);
  agendaDia$ = this._agendaDiaSubject.asObservable();
  atualizarAgendaDia(novaAgendaDia: any[]) {
    this._agendaDiaSubject.next(novaAgendaDia);
  }


  public Vazia: Agenda = {
    id: 0,
    idCliente:0,
    nome:'',
    configRept: 'X',
    idFuncAlt:0,
    sala:0,
    dtAlt:'',
    status:'',
    repeticao:'',
    obs:'',
    horario:'',
    historico:'',
    diaDaSemana:'',
    diaI:'',
    diaF:'',
    valor: -1000009,
  };

  public tVazia: Tipo = {
    id: 0,
    nome: '',
  }
  private aVazia: Agenda[] = [];
  public parImpar: string = '';
  public diaSemana: string = '-';
  public dia: string = new Date().toISOString().split('T')[0];
  public diaCel: Date = new Date();
  public un: number = 1;
  public sala: number = 0;
  public hora: number = 0;
  public horario: string = '';
  public celSelect: Agenda = this.Vazia;
  public cellA: Agenda = this.Vazia;
  public agendaDia: TableAgenda[] = [];
  public agendaDiaAnt: TableAgenda[] = [];
  public linTmp: TableAgenda[] = [];
  public dHora: number = 0;
  public dSala: number = 0;
  public agendaG: Agenda[] = [];
  public agendaCriada!: Agenda
  public buscaConcluida: boolean = false;
  public ListaCLientes: Tipo[] = [];
  public ListaEquipe: Tipo[] = [];
  public ListaValores: Valor[] = [];
  public Cliente!: Cliente;
  public Equipe!: Colaborador;
  public fotografia: boolean = false;
  public changes: boolean = false;
  public success: boolean = false;
  // public donoSala: DonoSala[]=[];
  // public donoTmp: DonoSala[]=[];
  public agendaNsessoes: number = 0;
  public agendaMulti: Agenda[] = [];

  public listaHorarios: any = [
    {n: 0, horario: 'manhã'},
    {n: 1, horario: '08:00'},
    {n: 2, horario: '08:50'},
    {n: 3, horario: '09:40'},
    {n: 4, horario: '10:30'},
    {n: 5, horario: '11:20'},
    {n: 6, horario: '12:10'},
    {n: 7, horario: 'tarde'},
    {n: 8, horario: '13:10'},
    {n: 9, horario: '14:00'},
    {n: 10, horario: '14:50'},
    {n: 11, horario: '15:40'},
    {n: 12, horario: '16:30'},
    {n: 13, horario: '17:20'},
    {n: 14, horario: '18:10'},
    {n: 15, horario: '19:00'},
  ]




  constructor(private http: HttpClient,
    private clienteService: ClienteService,
    private colaboradorService: ColaboradorService,
    public fotoService: FileService,
    private shared: SharedService) {



    }


  recarregar(){
    this.BuscaAgenda(this.dia)

  }

  // async validaDono(){
  //   console.log('Par Impar: ' + this.parImpar)
  //   const diaDaSemana = new Date(this.dia).getDay();
  //   const diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  //   this.diaSemana = diasDaSemana[diaDaSemana];
  //   console.log('Dia Semana:' + this.diaSemana)
  //   console.log()
  //   for (let i of this.donoTmp){
  //     let vRet = false;
  //     const Rep = i.configRept.split('%')
  //     let lin: DonoSala[]=[]
  //     if (Rep[0]=="D"){
  //       vRet = true
  //     }
  //     if (Rep[0]=="S" && Rep[1] == this.diaSemana){
  //       vRet = true
  //     }
  //     if (Rep[0]=="Q" && Rep[1] == this.diaSemana && Rep[2] == this.parImpar){
  //       vRet = true
  //     }
  //     if (Rep[0]=="M" && Rep[2] == this.dia){
  //       vRet = true
  //     }

  //     if(vRet == true){
  //       lin = [{
  //         id: i.id,
  //         unidade: i.unidade,
  //         sala: i.sala,
  //         idProfissional:i.idProfissional,
  //         area: i.area,
  //         diaSemana: i.diaSemana,
  //         dataInicio: i.dataInicio,
  //         dataFim: i.dataFim,
  //         periodo: i.periodo,
  //         configRept: i.configRept,
  //       }]
  //       this.donoSala = [...this.donoSala, ...lin]
  //     }
  //   }

  //   for (let i of this.donoSala){
  //     let nomeProfissional = '';
  //     if(i.unidade == this.un){
  //       const ntmp = this.listaHorarios.find((item: { horario: string | undefined; }) => item.horario === i.periodo);
  //       if (i.periodo == 'manhã' || i.periodo == 'tarde'){
  //         const idprof = this.ListaEquipe.find((item: { nome: string | undefined, id: number | undefined }) => item.id === i.idProfissional);
  //         if (idprof) {
  //           nomeProfissional = idprof.nome;
  //         }
  //       }

  //       const n = ntmp.n !== undefined ? ntmp.n  * 100: 0;
  //       const s = i.sala !== undefined ? i.sala : 0;
  //       const idTemp = n + s;
  //       let verif = false;
  //       for (let j of this.agendaDia){
  //         if (idTemp == j.idtmp){
  //           if (j.nome == ''){
  //             j.nome = nomeProfissional
  //           j.subtitulo = i.area
  //           }
  //           verif = true
  //         }
  //       }
  //       if (verif == false){
  //         const Lin: TableAgenda[] = [{
  //           id: i.id,
  //           idCliente: 0,
  //           nome:  nomeProfissional,
  //           idFuncAlt:  0,
  //           dtAlt:  '',
  //           configRept: i.configRept,
  //           horario:  i.periodo,
  //           sala:  i.sala,
  //           unidade:  i.unidade,
  //           diaI:  this.dia,
  //           diaF: this.dia,
  //           diaDaSemana:  this.diaSemana,
  //           repeticao:  '',
  //           subtitulo:  i.area,
  //           status: 'Pendente',
  //           historico:  '',
  //           obs:  'Gerado automaticamente pela repetição',
  //           valor:  0,
  //           idtmp: idTemp
  //       }]
  //       this.agendaDia = [...this.agendaDia, ...Lin]
  //       console.log('AgendaDia em AgendaService:')
  //       console.log(this.agendaDia)
  //       console.log('Em Shared, os clientes:')
  //       console.log(this.shared.DataS)
  //       }

  //     }
  //   }
  // }

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
  getAgendaMulti(agenda: Agenda): Promise<Response<Agenda>> {    // Use http.post para enviar dados no corpo da requisição
    return this.http.post<Response<Agenda>>(`${this.apiUrl}/ValidAgenda`, agenda).toPromise()
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

  async BuscaAgenda(dia: string): Promise<boolean> {
    this.Cliente = this.clienteService.clienteVazio
    this.Equipe = this.colaboradorService.equipeVazia
    this.celSelect = this.Vazia;
    this.agendaDia = [];
    this.atualizarAgendaDia([])
    const data: Response<Agenda[]> = await this.getAgendaByDate(dia);

    this.agendaG = data.dados;
    setTimeout(() => {
    }, 300);
    for (let i of this.agendaG){
      if(i.unidade == this.un){
        const ntmp = this.listaHorarios.find((item: { horario: string | undefined; }) => item.horario === i.horario);
        const n = ntmp.n !== undefined ? ntmp.n  * 100: 0;
        const s = i.sala !== undefined ? i.sala : 0;
        const idTemp = n + s;
        if (i.repeticao == '' || i.repeticao == undefined){
          i.repeticao = 'Unica'
        }
        this.linTmp = [{
          id: i.id,
          idCliente:  i.idCliente,
          nome:  i.nome,
          idFuncAlt:  i.idFuncAlt,
          dtAlt:  i.dtAlt,
          configRept: i.configRept,
          horario:  i.horario,
          sala:  i.sala,
          unidade:  i.unidade,
          diaI:  i.diaI,
          diaF:  i.diaF,
          diaDaSemana:  i.diaDaSemana,
          repeticao:  i.repeticao,
          subtitulo:  i.subtitulo,
          status:  i.status,
          historico:  i.historico,
          obs:  i.obs,
          valor:  i.valor,
          idtmp: idTemp
        }]

        const verifRept = this.validaRept(this.linTmp);
        if (verifRept == true){
          this.agendaDia = [...this.agendaDia, ...this.linTmp]
        }
      }
    }
    this.agendaDiaAnt = this.agendaDia;
    this.atualizarAgendaDia(this.agendaDia)
    return true;
  }

validaRept(agenda: Agenda[]): boolean {
  for (let i of agenda){
    const Rep = i.configRept.split('%')
    if (Rep[0] == 'X' || Rep[0] == 'D'){
      return true;
    }
    if (Rep[0] == 'S' && Rep[1] == this.diaSemana){
      return true;
    }
    if (Rep[0] == 'Q' && Rep[1] == this.diaSemana && Rep[2] == this.parImpar){
      return true;
    }
    if (Rep[0] == 'M' && Rep[2] == this.dia.substring(9,2)){
      return true;
    }
  }
  return false
}




  GetClientesByAgenda(tipo: string): Promise<any> {
    return this.http.get<any>(`${environment.ApiUrl}/Cliente/Agenda/${tipo}`).toPromise();
  }
  async BuscaClientes(){
    const data = await this.GetClientesByAgenda('nome');
    this.ListaCLientes = data.dados
  }
  GetColabByAgenda(): Promise<any> {
    return this.http.get<any>(`${environment.ApiUrl}/Colaborador/Agenda`).toPromise();
  }
  async BuscaColab(){
    const data = await this.GetColabByAgenda();
    this.ListaEquipe = data.dados
  }

  async BuscarAgenda(dia: string): Promise<boolean> {
    this.Cliente = this.clienteService.clienteVazio
    this.Equipe = this.colaboradorService.equipeVazia
    this.celSelect = this.Vazia;
    this.agendaDia = [];
    const data: Response<Agenda[]> = await this.getAgendaByDate(dia);

    this.agendaG = data.dados;
    this.success = true
    return true;
  }


  async BuscaColabor(id: number){
    let data: any;
    try{
      const data = await this.colaboradorService.GetColaboradorbyId(id)
      this.Equipe = data.dados
      console.log(this.Equipe)
    }
    catch{

    }
    return true

  }

  buscaData(){

  }


    async BuscaValores(){
      let data = 'nada por enquanto 2'
      try{
        data = await this.shared.BuscaValores();
      }
      catch{

      }
      return data;
    }



    async BuscaCliente(id: number){
      const data = await this.clienteService.BuscaClientesById(id)
      if(data){
        this.Cliente = this.clienteService.cliente
      }
    }



    async UpdateAgenda(id: number, agenda: Agenda): Promise<Agenda[]> {
      try {
        const response = await this.http.put<Response<Agenda[]>>(`${this.apiUrl}/UpdateAgenda/${id}` , agenda).toPromise();

        if (response && response.dados !== undefined && response.sucesso) {
          return response.dados;
        } else {
          throw new Error('Resposta da API é indefinida, não contém dados ou não é bem-sucedida.');
        }
      } catch (error) {
        throw error; // Você pode personalizar essa parte conforme sua necessidade
      }
    }
    async CreateAgenda(agenda: Agenda): Promise<Agenda[]> {
      try {
        const response = await this.http.post<Response<Agenda[]>>(`${this.apiUrl}/CreateAgenda` , agenda).toPromise();
        if (response && response.dados !== undefined && response.sucesso) {
          this.agendaG = response.dados;
          return response.dados;
        } else {
          throw new Error('Resposta da API é indefinida, não contém dados ou não é bem-sucedida.');
        }
      } catch (error) {
        throw error; // Você pode personalizar essa parte conforme sua necessidade
      }
    }





    calcularDiferencaDeDias(data1: string, data2: string): number {
      const [dia1, mes1, ano1] = data1.split('/').map(Number);
      const [dia2, mes2, ano2] = data2.split('/').map(Number);

      const dataInicio = new Date(ano1, mes1 - 1, dia1); // O mês é indexado de 0 a 11 no JavaScript
      const dataFim = new Date(ano2, mes2 - 1, dia2);

      // Calcula a diferença em milissegundos e converte para dias
      const diferencaEmMilissegundos = dataFim.getTime() - dataInicio.getTime();
      const diferencaEmDias = diferencaEmMilissegundos / (1000 * 60 * 60 * 24);

      return Math.abs(Math.round(diferencaEmDias));
    }

    calcSemanaSimNao(data2: string): string {
      if (data2.includes('-')){
        const data = data2.split('-');
        data2 = data[2] + '/' + data[1] + '/' + data[0]
      }
      const data1 = '05/01/2020'
      const diff = this.calcularDiferencaDeDias(data1, data2)

      const conta = Math.floor(diff/7) % 2;

      this.parImpar = conta == 0 ? 'P' : 'I'
      return this.parImpar

    }
    calcDiaSemana(data3: string): string {
      if (data3.includes('/')){
        const data = data3.split('-');
        data3 = data[2] + '-' + data[1] + '-' + data[0]
      }
      const diaDaSemana = new Date(data3).getDay();
      const diasDaSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
      const result = diasDaSemana[diaDaSemana];
      return result

    }




  carregarCel(){

    this.Cliente = this.clienteService.clienteVazio
    this.celSelect = {
      id: 0,
      idCliente:0,
      nome:'',
      configRept: 'X',
      idFuncAlt:0,
      sala:0,
      dtAlt:'',
      status:'',
      repeticao:'',
      obs:'',
      horario:'',
      historico:'',
      diaDaSemana:'',
      diaI:'',
      diaF:'',
      valor: -1000009,
    };

    const s = this.hora * 100;
    const idSelect = s + this.sala;

    for(let i of this.agendaDia){
      if (i.idtmp == idSelect){
        this.celSelect = {
          id: 0,
          idCliente:0,
          nome:'',
          configRept: 'X',
          idFuncAlt:0,
          sala:0,
          dtAlt:'',
          status:'',
          repeticao:'',
          obs:'',
          horario:'',
          historico:'',
          diaDaSemana:'',
          diaI:'',
          diaF:'',
          valor: -1000009,
        };
        this.celSelect ={
          id: i.id,
          idCliente:  i.idCliente,
          configRept: i.configRept,
          nome:  i.nome,
          idFuncAlt:  i.idFuncAlt,
          dtAlt:  i.dtAlt,
          horario:  i.horario,
          sala:  i.sala,
          unidade:  i.unidade,
          diaI:  i.diaI,
          diaF:  i.diaF,
          diaDaSemana:  i.diaDaSemana,
          repeticao:  i.repeticao,
          subtitulo:  i.subtitulo,
          status:  i.status,
          historico:  i.historico,
          obs:  i.obs,
          valor:  i.valor,
        }
      }
      this.cellA = this.celSelect;
    }

    this.celSelect.idCliente = this.celSelect.idCliente !== undefined ? this.celSelect.idCliente : 0;
    if (this.celSelect.id == 0){
      let data: any = 'nada por enquanto';
      // try{
      //   data = this.BuscaValores();
      // }catch{
      //   data = null;
      // }
      this.ListaValores = data.value;
      console.log(this.ListaValores)
    }
    if (this.celSelect.idCliente !== 0){
      if (this.celSelect.horario == 'manhã' || this.celSelect.horario == 'tarde'){
        const data = this.BuscaColabor(this.celSelect.idCliente)
        this.Cliente.foto = this.Equipe.foto !== '' ? this.Equipe.foto : this.fotoService.semfoto2
      }else{
        const data = this.BuscaCliente(this.celSelect.idCliente)
      this.Cliente.foto = this.Cliente.foto !== '' ? this.Cliente.foto : this.fotoService.semfoto2
      }


    }
    this.celSelect.id = this.celSelect.id !== undefined ? this.celSelect.id : 0;
    this.Cliente.foto = this.Cliente.foto !== '' ? this.Cliente.foto : this.fotoService.semfoto2
    this.fotografia = true
    for(let i of this.listaHorarios){
      if (i.n == this.hora){
        this.horario = i.horario
      }
    }

  }

  carregarSala(){
    this.Equipe = this.colaboradorService.equipeVazia
    this.celSelect = this.Vazia;

    const s = this.hora * 100;
    const idSelect = s + this.sala;
    for(let i of this.agendaDia){
      if (i.idtmp == idSelect){
        this.celSelect ={
          id: i.id,
          configRept: i.configRept,
          idCliente:  i.idCliente,
          nome:  i.nome,
          idFuncAlt:  i.idFuncAlt,
          dtAlt:  i.dtAlt,
          horario:  i.horario,
          sala:  i.sala,
          unidade:  i.unidade,
          diaI:  i.diaI,
          diaF:  i.diaF,
          diaDaSemana:  i.diaDaSemana,
          repeticao:  i.repeticao,
          subtitulo:  i.subtitulo,
          status:  "Sala",
          historico:  i.historico,
          obs:  i.obs,
          valor:  0,
        }
        this.cellA = this.celSelect
      }
    }

    this.celSelect.idCliente = this.celSelect.idCliente !== undefined ? this.celSelect.idCliente : 0;

    if (this.celSelect.idCliente !== 0){
      const data = this.BuscaColabor(this.celSelect.idCliente)
      this.Equipe.foto = this.Equipe.foto !== '' ? this.Equipe.foto : this.fotoService.semfoto2

    }
    this.celSelect.id = this.celSelect.id !== undefined ? this.celSelect.id : 0;
    const fotoUnd = this.Equipe !== undefined ? this.Equipe.foto : this.fotoService.semfoto2
    this.Equipe.foto = fotoUnd !== '' ? fotoUnd : this.fotoService.semfoto2
    this.fotografia = true
    for(let i of this.listaHorarios){
      if (i.n == this.hora){
        this.horario = i.horario
      }
    }
    console.log(this.celSelect)

  }

}
