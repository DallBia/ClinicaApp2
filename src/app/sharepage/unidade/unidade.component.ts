import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

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
constructor(private agendaService: AgendaService) {


}


ToggleUnit(){
  this.x = !this.x;
  if(this.x == true){
    this.agendaService.setUnitAtual(1);
    this.agendaService.recarregar(this.dia,1);
  }else{
    this.agendaService.setUnitAtual(2);
    this.agendaService.recarregar(this.dia,2);
  }

}

}
