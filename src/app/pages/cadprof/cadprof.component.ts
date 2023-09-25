import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Colaborador } from "src/app/models/Colaboradors";
import { TableProf } from "src/app/models/Tables/TableProf";
import { User } from "src/app/models/user";
import { UserService } from "src/app/services";
import { ColaboradorService } from "src/app/services/colaborador/colaborador.service";
import { FormacaoService } from "src/app/services/formacao/formacao.service";
import { FormClienteComponent } from "src/app/sharepage/form-cliente/form-cliente.component";
import { FormsComponent } from "src/app/sharepage/forms/forms.component";
import { ModalComponent } from "../../sharepage/forms/modal/modal.component";
import { MatDialog } from "@angular/material/dialog";
import { EquipeModalComponent } from "./equipe-modal/equipe-modal.component";


@Component({
  selector: 'app-cadprof',
  templateUrl: './cadprof.component.html',
  styleUrls: ['./cadprof.component.css'],
  template: `
  <label>{{ selectedName }}</label>
`
})
export class CadprofComponent implements OnDestroy, OnInit {

  @ViewChild(FormsComponent) formProf!: FormsComponent;

    Atual: TableProf = {
      foto: 'string',
      ficha: 'string',
      id: 0,
      nome: 'string',
      nascimento: 'any',
      area: '',
      selecionada: false,
      desde: '',
      proxses: '',
      celular: '',
      identidade : '',
      cpf : '',
      endereco : '',
      email : '',
      ativo : true,
      perfil : '',
      formacao: undefined
    };

    pLin: TableProf[] = [];
    dataSource: TableProf[] = [];
    ColAt!: TableProf;

    nProf = 1;
    EAtual!: Colaborador; // guarda o usuário atual
    nEquipe: number = 0;
    FAtual: any; //guarda a lista de Formações do usuário.
    nFormacao: number = 0;
    public Usr!: User;
    nUsr:number = 0;
    private subscription: Subscription;
    nChanges: boolean = false;
    Selecionada: string = '';
    ListaEquipe: any;
    ListaFormacaos: any;
    private control!:any;
    private ctrl1: boolean = false;
    private ctrl2: boolean = false;

    private estadoMonitorado = new BehaviorSubject<boolean>(false);

  constructor(private formacaoService: FormacaoService,
    private userService: UserService,
    public dialog: MatDialog,
    private colaboradorService: ColaboradorService,
    ){
      this.subscription = this.colaboradorService.EquipeA$.subscribe(
        name => this.nEquipe = name
      );


    }

  ngOnInit(){
    this.colaboradorService.dataSource = [];
    this.colaboradorService.inicio();

    this.colaboradorService.ProfAtual$.subscribe(EquipeAtual => {
      this.ColAt = EquipeAtual;
    });
    this.colaboradorService.ChangesA$.subscribe(chng => {
      this.nChanges = chng;
    });
    

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

  }


  CliqueNovo(){
    const dialogRef = this.dialog.open(EquipeModalComponent, {
      disableClose: true  // Isto impede que o modal seja fechado ao clicar fora dele ou pressionar ESC
  });
  dialogRef.afterClosed().subscribe((result: any) => {
   
  });
  }


}
