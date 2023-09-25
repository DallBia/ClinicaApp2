import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { Colaborador } from "src/app/models/Colaboradors";
import { TableData } from "src/app/models/Tables/TableData";
import { UserService } from "src/app/services";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { ColaboradorService } from "src/app/services/colaborador/colaborador.service";
import { ProntuarioService } from "src/app/services/prontuario/prontuario.service";
import { BlocoNotasComponent } from "src/app/sharepage/bloco-notas/bloco-notas.component";
import { LoginComponent } from "../login/login.component";


@Component({
  selector: 'app-protadm',
  templateUrl: './protadm.component.html',
  styleUrls: ['./protadm.component.css']
})


export class ProtadmComponent implements OnInit, OnDestroy{


  @ViewChild(BlocoNotasComponent) blocoNotas!: BlocoNotasComponent;
  @ViewChild(LoginComponent) login!: LoginComponent;
  texto: string = '';
  private subscription!: Subscription;
  nCliente!: number;
  Atual!: TableData;
  public Ficha:string = 'FICHA';
  public NomeCliente: string = '';
  public MostraInfo: boolean = true;
  public idFoto: string = '';
  public User!:Colaborador;
  public nUser!: number;
  public UserAll!: any;



  constructor(private colaboradorService: ColaboradorService,
    private clienteService: ClienteService,
    private prontuarioService: ProntuarioService,
    private userService: UserService) {
    this.subscription = this.clienteService.ClienteA$.subscribe(
      nameC => this.nCliente = nameC
    )
    this.subscription = this.userService.EquipeA$.subscribe(
      nameC => this.nUser = nameC
    )

    this.clienteService.ClienteAtual$.subscribe(clienteAtual => {
      this.Atual = clienteAtual;
    });
  }

  ngOnInit() {


    this.subscription = this.clienteService.ClienteA$.subscribe(
      nameC => this.nCliente = nameC
    )
    this.subscription = this.userService.EquipeA$.subscribe(
      nameC => this.nUser = nameC
    )

    this.clienteService.ClienteAtual$.subscribe(clienteAtual => {
      this.Atual = clienteAtual;
    });

    this.UserAll = this.colaboradorService.GetColaborador();
// this.delay(300);

    if(this.nCliente !== 0){
        this.Ficha = this.Atual.Ficha;
      this.NomeCliente = this.Atual.nome.toUpperCase();
      this.idFoto = '../../../assets/img/Clientes/' + this.Ficha + '.jpg'

      }else{
      this.Ficha = 'FICHA';
      this.NomeCliente = '';
       // console.log(this.idFoto)
    }
    this.newInfo(this.MostraInfo);
  }

  newInfo(opt: boolean){
    this.MostraInfo = !opt;
  }

  adicionarEspaco() {
    this.texto += '\n\n';
  }


  ficha = [
    { texto: this.Ficha, altura: '10vh', largura: '18vh', cor: 'var(--cor-clara)', size: '20pt' }
  ];
  containers = [
    {altura:'10vh', largura: "200vh"}
  ];
  botoes = [
    { texto: '', altura: '4.6vh', largura: '15vh', cor: 'white' },
    { texto: '', altura: '4.6vh', largura: '15vh', cor: 'white' },
    { texto: '', altura: '4.6vh', largura: '15vh', cor: 'white'},
    { texto: '', altura: '4.6vh', largura: '15vh', cor:'white' }
  ];
  botoesInfo = [
    { texto: 'Anexar Documento', altura: '4vh', largura: '30vh', cor: 'white' },
    { texto: 'Ver Documento', altura: '4vh', largura: '30vh', cor: 'white' },
    { texto: 'Imprimir Relatório', altura: '4vh', largura: '30vh', cor: 'white' },
    { texto: 'Buscar neste Prontuário', altura: '4vh', largura: '30vh', cor: 'white' },
    { texto: 'Inserir nova informação', altura: '4vh', largura: '30vh', cor: 'white' },
 ]

 ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}


//   constructor(private sharedService: SharedService) {
//     this.subscription = this.sharedService.selectedNascimento$.subscribe(
//     name => this.selectedNascimento = name );
//     this.idade1 = this.converterParaDate(this.selectedNascimento);
//     this.idade = this.calcularIdade(this.idade1);

//   }


//   imageUrl = 'http://localhost:5000/wwwroot/003.jpg';


//   ngOnDestroy(): void {
//     this.subscription.unsubscribe();
//   }

//   converterParaDate(dataString: string): Date {
//     const [dia, mes, ano] = dataString.split('/').map(Number);
//     return new Date(ano, mes - 1, dia);
// }
//   calcularIdade(dataNascimento: Date): number {
//     const hoje = new Date();
//     let idade = hoje.getFullYear() - dataNascimento.getFullYear();

//     // Ajuste para caso o aniversário ainda não tenha ocorrido este ano
//     const m = hoje.getMonth() - dataNascimento.getMonth();
//     if (m < 0 || (m === 0 && hoje.getDate() < dataNascimento.getDate())) {
//         idade--;
//     }

//     return idade;
//   }
// }
