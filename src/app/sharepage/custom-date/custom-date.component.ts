import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../navbar/header.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';

@Component({
  selector: 'app-custom-date',
  templateUrl: './custom-date.component.html',
  styleUrls: ['./custom-date.component.css']
})
export class CustomDateComponent implements OnInit {
  displayedDate: Date = new Date();
  semana = ['DOM','SEG','TER','QUA','QUI','SEX','SÁB'];
  diaSemana: string = '';
  dia: string = '';
  Unit: number = 0;
  subscription!: Subscription;
  changes: boolean = false;
  ctrl: boolean = false;


  constructor(public agendaService: AgendaService){}

  onDateChange(newDate: Date) {
    var diaDaSemana = newDate.getDay();
    var diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    this.diaSemana = diasDaSemana[diaDaSemana];
    this.dia = newDate.toISOString();
    const novoDia = new Date(newDate).toISOString().split('T')[0]
    this.agendaService.setDiaAtual(novoDia)
    this.agendaService.setChangesA(false);
    this.agendaService.setEtapaA(1);
  }

  onDivClick(newDate: Date) {
    console.log("Clicou!");

    //this.onDateChange(dia);
    var diaDaSemana = newDate.getDay();
    var diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    this.diaSemana = diasDaSemana[diaDaSemana];
    this.dia = newDate.toISOString();
    const novoDia = new Date(newDate).toISOString().split('T')[0]
    this.agendaService.setDiaAtual(novoDia)
    //this.agendaService.setChangesA(false);
    console.log(newDate);
    //this.agendaService.setEtapaA(1);
  }



  ngOnInit(): void {
    this.subscription = this.agendaService.UnitA$.subscribe(
      name => this.Unit = name
    )
    // this.subscription = this.agendaService.ChangesA$.subscribe(
    //   name => this.changes = name
    // )
  //   this.subscription = this.agendaService.EtapaA$.subscribe(
  //     name => {
  //       // if(name ==1){
  //       //   //this.agendaService.recarregar();
  //       // }

  //     }
  //   )
  }

}



