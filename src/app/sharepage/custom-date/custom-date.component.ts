import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../navbar/header.service';
import { AgendaService } from 'src/app/services/agenda/agenda.service';
import { Agenda2Service } from 'src/app/services/agenda/agenda2.service';

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

  constructor(public agendaService: AgendaService,
              public agenda2: Agenda2Service){}

  onDateChange(newDate: Date) {
    var diaDaSemana = newDate.getDay();
    var diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    this.diaSemana = diasDaSemana[diaDaSemana];
    this.dia = newDate.toISOString();
    const novoDia = new Date(newDate).toISOString().split('T')[0]
    this.agendaService.setDiaAtual(novoDia)
    this.agendaService.setChangesA(false);
    this.agendaService.setEtapaA(1);
    this.agenda2.dia = novoDia;
    this.agenda2.recarregar();
  }

  onDivClick(newDate: Date) {


    //this.onDateChange(dia);
    var diaDaSemana = newDate.getDay();
    var diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    this.diaSemana = diasDaSemana[diaDaSemana];
    this.dia = newDate.toISOString();
    const novoDia = new Date(newDate).toISOString().split('T')[0]
    this.agendaService.setDiaAtual(novoDia)
    this.agenda2.dia = novoDia;
    this.agenda2.recarregar();
    console.log(newDate);
  }



  ngOnInit(): void {
    this.subscription = this.agendaService.UnitA$.subscribe(
      name => this.Unit = name
    )
  }

}



