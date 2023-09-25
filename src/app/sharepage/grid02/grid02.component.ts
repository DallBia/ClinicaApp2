import { TableProf } from './../../models/Tables/TableProf';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services';
import { FormacaoService } from 'src/app/services/formacao/formacao.service';
import { ColaboradorService } from 'src/app/services/colaborador/colaborador.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-grid02',
  templateUrl: './grid02.component.html',
  styleUrls: ['./grid02.component.css']
})
export class Grid02Component {
  dataSource: TableProf[] = [];
  public nLin: TableProf[] = [];
  public Verifica: boolean = false;
subscription: Subscription;
  nChanges!: boolean;


  private nChn = new BehaviorSubject<boolean>(false);
  nChn$ = this.nChn.asObservable();
    setnChnl(name: boolean) {
      this.nChn.next(name);
    }








  destacarLinha(l:any, Ficha:string){
    this.nChanges = false;
    this.colaboradorService.setChangesA(false);
    let numero = parseInt(l.ficha, 10);
      if (isNaN(numero)) {
        numero = 0;
    }
    for(let i of this.colaboradorService.dataSource){
      i.selecionada = false;
    }
    // this.colaboradorService.dataSource.forEach(i => i.selecionada = false);// Desmarcar todas as outras linhas
    this.colaboradorService.setEquipeA(numero);
 
    // const Vazia1 = this.dataSource.find(cliente => cliente.Id === numero)
    let a: any;
    // this.colaboradorService.setEquipeAtual(this.colaboradorService.dataSource.find(user => parseInt(user.Ficha, 10) === numero) || a);
    this.colaboradorService.setProfAtual(this.colaboradorService.dataSource.find(user => parseInt(user.ficha, 10) === numero) || a);
   
    l.selecionada = true;// Marcar a linha clicada

    this.nChanges = true;
    setTimeout(() => {
      this.colaboradorService.setChangesA(true);
    }, 10)
    // console.log(l)
  }
  constructor(public colaboradorService: ColaboradorService, private userService: UserService, private formacaoService: FormacaoService) {


    this.subscription = this.colaboradorService.ChangesA$.subscribe(
      name => this.nChanges = name
    )
    // this.subscription = this.userService.ChangesA$.subscribe(
    //   name => this.nChanges = name
    // )

  }

}
