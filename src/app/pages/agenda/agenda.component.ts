import { Component } from '@angular/core';
import { CelAgendaComponent } from 'src/app/sharepage/cel-agenda/cel-agenda.component';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent {

  valor: string = 'valor a ser passado para o componente filho';
  public colunas: number[] = [];
  public linhas: number[] = [];

  constructor() {
    for (let i = 0; i <= 30; i++) {
      this.colunas.push(i);
    }
    for (let j = 1; j <= 15; j++) {
      this.linhas.push(j);
    }
  }




}
