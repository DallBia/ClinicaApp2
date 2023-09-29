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
  constructor(public agendaService: AgendaService){}
  onDateChange(newDate: Date) {
    var diaDaSemana = newDate.getDay();
    var diasDaSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    this.diaSemana = diasDaSemana[diaDaSemana];
    console.log(this.diaSemana);
    this.dia = newDate.toISOString();
    console.log('Nova data selecionada:', this.dia);
    const novoDia = new Date(newDate).toISOString().split('T')[0]
    this.agendaService.BuscaAgenda(novoDia);
  }

  ngOnInit(): void {
    // this.headerService.LinkA$.subscribe(link => {
    //   this.linkA = link;
    // });
  }

}


//ꟷꚚꟷ ֍ ─●─
