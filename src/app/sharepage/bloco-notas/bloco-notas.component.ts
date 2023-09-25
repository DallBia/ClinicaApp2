import { Component, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { HeaderService } from '../../sharepage/navbar/header.service';
import { ProtclinComponent } from 'src/app/pages/protclin/protclin.component';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { Subscription } from 'rxjs';
import { TableData } from 'src/app/models/Tables/TableData';
import { Colaborador } from 'src/app/models/Colaboradors';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ProntuarioService } from 'src/app/services/prontuario/prontuario.service';
import { UserService } from 'src/app/services';
import { Prontuario } from 'src/app/models/Prontuarios';

@Component({
  selector: 'app-bloco-notas',
  templateUrl: './bloco-notas.component.html',
  styleUrls: ['./bloco-notas.component.css']
})
export class BlocoNotasComponent {
  text: string = '';
  processedText: string = '';
  @Output() onSubmit = new EventEmitter<string>();

  //==================================================================
  @ViewChild(LoginComponent) login!: LoginComponent;

  texto: string = '';
  linkA!: string;
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
//===================================================================

  highlightLinks() {
    // RegEx para detectar links ou arquivos
    let regex = /(http[s]?:\/\/[^\s]+)|(\.([a-zA-Z]{3,4}))$/;

    // Se o texto final corresponde a um link ou arquivo
    if(regex.test(this.text)) {
        this.text = this.text.replace(regex, '<span style="color: blue;">$&</span>');
    }

    this.processedText = this.text;
}

Enviar(){
  let texto = this.processedText;
  // texto = texto.replace(/\r\n|\n/g, '<br><br>')
  this.Insere(texto.toString());
}

onKeydown(event: KeyboardEvent): void {
  const target = event.target as HTMLTextAreaElement;
  if (event.key === 'Enter' && target) {
      event.preventDefault();
      const startPosition = target.selectionStart;
      const endPosition = target.selectionEnd;
      const originalValue = target.value;
      target.value = originalValue.substring(0, startPosition)
                          + '\n\n'
                          + originalValue.substring(endPosition);
      target.selectionStart = target.selectionEnd = startPosition + 2;
  }
}
  constructor(private clienteService: ClienteService,
  private headerService: HeaderService,
  private prontuarioService: ProntuarioService,
  private userService: UserService) { }

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
      this.headerService.LinkA$.subscribe(link => {
        this.linkA = link;
      });
}


Insere (processedText: string) {
  if (processedText.length > 1) {
    let tipo: string = '';
    switch (this.linkA) {
      case "PRONTUÁRIO CLÍNICO":
        tipo = 'clínico'
        break;
      case "PRONTUÁRIO ADMINISTRATIVO":
        tipo = 'administrativo'
        break;
      case "CONTROLE FINANCEIRO":
        tipo = 'financeiro'
        break;
      default:
        tipo = ''
        break;
    }
    const texto: Prontuario = {
      id: 0,
      idCliente: this.nCliente,
      idColab: this.nUser !== undefined ? this.nUser : 0,
      tipo: tipo,
      dtInsercao: new Date(),
      texto: processedText,
    };
    this.createProntuario(texto);
  }
}

createProntuario(texto: Prontuario) {
  this.prontuarioService.CreateProntuario(texto).subscribe(
    (data) => {
      this.delay(300);
      alert('Registro gravado!');
      this.delay(300);
      location.reload();
    },
    (error) => {
      console.error('Erro no upload', error);
    }
  );
}
delay(time:number) {
  setTimeout(() => {

  }, time);
}

}
