import { Component } from '@angular/core';
import { FinanceiroService } from 'src/app/services/financeiro/financeiro.service';

@Component({
  selector: 'app-tab-fin',
  templateUrl: './tab-fin.component.html',
  styleUrls: ['./tab-fin.component.css']
})
export class TabFinComponent {


  /**
   *
   */
  constructor(
      public finService: FinanceiroService,

  ) {

  }


  Selec(l:any,event:any, nome: string, valor: number){

  }
}
