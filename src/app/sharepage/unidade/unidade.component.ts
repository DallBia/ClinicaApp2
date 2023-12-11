import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agenda2Service } from 'src/app/services/agenda/agenda2.service';

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.css']
})
export class UnidadeComponent implements OnInit {
public x: boolean=true;
private subscription!: Subscription;
private dia: string = new Date().toISOString().split('T')[0];
public Ligado = [
  {fontWeight: 'bolder', fontSize:'x-large',porc:'75%',porc2:'76%'}
]

ngOnInit(){
  this.subscription = this.agendaService.diaA$.subscribe(
    name => this.dia = name
  )

}
constructor(private agendaService: AgendaService,
            public agenda2: Agenda2Service) {


}


ToggleUnit(){
  this.x = !this.x;
  const xdia = this.dia;
  if(this.x == true){
    // this.agendaService.setBuscaA(xdia + '%1');
    // this.agendaService.setUnitAtual(1);
    this.agenda2.un = 1
    console.log('Unidade 1')
  }else{
    // this.agendaService.setBuscaA(xdia + '%2');
    // this.agendaService.setUnitAtual(2);
    this.agenda2.un = 2
    console.log('Unidade 2')
  }

  this.agenda2.recarregar();
}

}
