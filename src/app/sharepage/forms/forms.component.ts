import { Component, ViewChild, ElementRef, Input , OnChanges, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormsModule , FormControl, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';
import { Colaborador } from 'src/app/models/Colaboradors';
import { Formacao } from 'src/app/models/Formacaos';
import { FormacaoService } from 'src/app/services/formacao/formacao.service';
import { TableProf } from 'src/app/models/Tables/TableProf';
import { ModalComponent } from './modal/modal.component';
import { MatDialog } from "@angular/material/dialog";





interface FormField {
  id:number,
  idFuncionario: number,
  dtConclusao: any,
  nivel: string,
  registro: string,
  instituicao: string,
  nomeFormacao: string,
  areasRelacionadas:string,
  psicologia:boolean,
  fisiopadovan:boolean,
  psicopedagogia:boolean,
  terapiaocup:boolean,
  fono:boolean,
  arteterapia:boolean,
  psicomotr:boolean,
  neurofeedback:boolean,
  reforcoesc:boolean,
  
}
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})

export class FormsComponent implements OnDestroy, OnInit {
// ================= -- VARIÁVEIS -- =============================
  equipeform!: FormGroup;
  formacaoform!: FormGroup;
  public formform: FormGroup[] = [];
  public Colab!: Colaborador;
  public xFormacao!: Formacao[];
  nColab:number = 0;
  public Atual!: TableProf;

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();
  formFields: FormField[] = [];
  formField!: FormField
 
  // ========================================================
  constructor(private http: HttpClient,
      private colaboradorService: ColaboradorService,
      private formacaoService: FormacaoService,
      private userService: UserService,
      public dialog: MatDialog,
      private formBuilder: FormBuilder
      ){

  }
  
  submitE(){
    this.submitForm.emit(this.equipeform.value);
  }
  submitF(){
    this.submitForm.emit(this.formacaoform.value);
  }
  ngOnInit(){
    this.colaboradorService.ProfAtual$.subscribe(Atual => {
      this.Atual = Atual;
    });
    // this.formacaoService.FormacaoAtual$.subscribe(Atual => {
    //   this.xFormacao = Atual;
    // });
    this.CarregaForm();
  }
  public formulario: any = {
    nomeFormacao: '',
    instituicao: '',
    dtConclusao:'',
    registro:'',
    nivel:'',
    psicologia: false,
    fisiopadovan: false,
    psicopedagogia: false,
    fono: false,
    terapiaocup: false,
    psicomotr: false,
    arteterapia: false,
    neurofeedback: false,
    reforcoesc: false,
  };

  CarregaForm(){


    this.formulario = {
      nomeFormacao: '',
      instituicao: '',
      dtConclusao:'',
      registro:'',
      nivel:'',
      psicologia: false,
      fisiopadovan: false,
      psicopedagogia: false,
      fono: false,
      terapiaocup: false,
      psicomotr: false,
      arteterapia: false,
      neurofeedback: false,
      reforcoesc: false,
    };
    this.equipeform = new FormGroup({
      id:new FormControl(this.Atual.id),
      perfil:new FormControl(this.Atual.perfil),
      nome:new FormControl(this.Atual.nome),
      nascimento:new FormControl(this.Atual.nascimento),
      celular:new FormControl(this.Atual.celular),
      identidade:new FormControl(this.Atual.identidade),
      cpf:new FormControl(this.Atual.cpf),
      endereco:new FormControl(this.Atual.endereco),
      email:new FormControl(this.Atual.email),
      desde:new FormControl(this.Atual.desde),
      ativo:new FormControl(this.Atual.ativo),
    });
    
    
    if (this.Atual.formacao !== undefined){
      
      for (let k of this.Atual.formacao) {
        //let formControl: any = {}; // Inicialize um objeto de controle para este objeto k
        let fG = new FormGroup({
        id:new FormControl(k.id),
        idFuncionario: new FormControl(k.idFuncionario),
        dtConclusao: new FormControl(k.dtConclusao),
        nivel: new FormControl(k.nivel),
        registro: new FormControl(k.registro),
        instituicao: new FormControl(k.instituicao),
        nomeFormacao: new FormControl(k.nomeFormacao),
        areasRelacionadas: new FormControl(k.areasRelacionadas),
        });
        const linha: string = '' + k.areasRelacionadas;
        const areasRelacionadasArray = linha.split(',').map(area => area.trim());
        
        let valorPsicologia = false;
        let valorFisioPadovan = false;
        let valorPsicopedagogia = false;
        let valorFonoaudiologia = false;
        let valorTerOcup = false;
        let valorPsicomotric = false;
        let valorArteterapia = false;
        let valorNeurofeedback = false;
        let valorReforcoEsc = false;
        
        for (const area of areasRelacionadasArray) {
          if(area == 'Psicologia'){
            valorPsicologia = true;
          }
          if(area == 'Fisioterapia Padovan'){
            valorFisioPadovan = true;
          }
          if(area == 'Psicopedagogia'){
            valorPsicopedagogia = true;
          }
          if(area == 'Fonoaudiologia'){
            valorFonoaudiologia = true;
          }
          if(area == 'Terapia Ocupacional'){
            valorTerOcup = true;
          }
          if(area == 'Psicomotricicade'){
            valorPsicomotric = true;
          }
          if(area == 'Arteterapia'){
            valorArteterapia = true;
          }
          if(area == 'Neurofeedback'){
            valorNeurofeedback = true;
          }
          if(area == 'Reforço Escolar'){
            valorReforcoEsc = true;
          }
        }
        const data = '' + k.dtConclusao;
        const datarray = data.split('-').map(area => area.trim());
        if(datarray[0].length == 4){
          console.log(datarray);
          k.dtConclusao = datarray[2] + '/' + datarray[1] + '/' + datarray[0]
          console.log('alterado: ' + k.dtConclusao);
        }
        console.log(k.dtConclusao);
        this.formField = {
          id: k.id !== undefined ? k.id : 0,
          idFuncionario: k.idFuncionario,
          dtConclusao:  k.dtConclusao,
          nivel: k.nivel !== undefined ? k.nivel : '',
          registro: k.registro !== undefined ? k.registro : '',
          instituicao: k.instituicao !== undefined ? k.instituicao : '',
          nomeFormacao: k.nomeFormacao !== undefined ? k.nomeFormacao : '',
          areasRelacionadas: k.areasRelacionadas !== undefined ? k.areasRelacionadas : '',
          psicomotr: valorPsicomotric,
          terapiaocup: valorTerOcup,
          fisiopadovan: valorFisioPadovan,
          reforcoesc: valorReforcoEsc,
          neurofeedback: valorNeurofeedback,
          psicopedagogia: valorPsicopedagogia,
          fono: valorFonoaudiologia,
          arteterapia: valorArteterapia,
          psicologia: valorPsicologia,
        }
        this.formFields.push(this.formField)
        // Adicione os elementos de k ao objeto de controle
        
        this.formform.push(fG);
      }  
    } 
  }
 
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj || {});
  }
  isChecked(substring: string, origem: string): boolean {
    // Verifica se a substring está presente em i.areasRelacionadas
    return origem.includes(substring);
  }

  ngOnDestroy(): void {

  }

  abrirModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
        disableClose: true  // Isto impede que o modal seja fechado ao clicar fora dele ou pressionar ESC
    });
    dialogRef.afterClosed().subscribe((result: any) => {
     
    });
  }



//====================================================

// selecionarImagem() {
//   this.fileInput.nativeElement.click();
// }

// onFileSelected(event:any) {
//   const file: File = event.target.files[0];
// const stringFormatada =  this.nUsr.toString().padStart(4, '0') + '.jpg';
// // this.caminho = '"../../../assets/img/Clientes/';
// // this.NovaImagem = this.caminho + this.stringFormatada;
// // this.semFoto ='"../../../assets/img/Clientes/0000.jpg';
// //// console.log(this.stringFormatada)
//   if (file) {
//       this.uploadFile(file, stringFormatada);
//   }
// }

// uploadFile(file: File, nome: string) {


//   const formData = new FormData();
//   formData.append('file', file, file.name);
//   formData.append('nome', nome);

//   this.http.post('https://localhost:7298/api/Image/', formData)
//       .subscribe(response => {
//           // console.log('Upload feito com sucesso', response);
//           this.delayAndRefresh();
//       }, error => {
//           console.error('Erro no upload', error);
//       });

//     }

//     delayAndRefresh() {
//       setTimeout(() => {
//         // this.Grid01Service.destacarLinha(this.nL,this.nFicha)
//       }, 300);

//     }

//
}
